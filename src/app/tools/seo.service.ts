import { inject, Service } from '@angular/core';
import { Meta } from '@angular/platform-browser';
import { environment } from '../../environments/environment';
import type { SeoConfig } from './seo.types';
import { injectSeoConfig } from './seo.types';

@Service()
export class SeoService {
  private readonly meta = inject(Meta);
  private readonly config = injectSeoConfig();

  /**
   * Called by TitleStrategy on every navigation.
   * Writes all managed tags, merging the route config with sensible defaults.
   */
  applyFromStrategy(config: SeoConfig, fullTitle: string): void {
    const merged = { ...this.config, ...config };

    this.meta.updateTag({ name: 'description', content: merged.description });
    this.meta.updateTag({ name: 'keywords', content: merged.keywords });
    this.meta.updateTag({ name: 'robots', content: merged.robots });

    this.meta.updateTag({ property: 'og:title', content: fullTitle });
    this.meta.updateTag({ property: 'og:description', content: merged.description });
    this.meta.updateTag({ property: 'og:type', content: merged.ogType });
    this.meta.updateTag({ property: 'og:image', content: this.resolveUrl(merged.ogImage) });

    this.meta.updateTag({ name: 'twitter:card', content: merged.twitterCard });
    this.meta.updateTag({ name: 'twitter:title', content: fullTitle });
    this.meta.updateTag({ name: 'twitter:description', content: merged.description });
    this.meta.updateTag({ name: 'twitter:image', content: this.resolveUrl(merged.ogImage) });
  }

  /** Imperative API — pages may override tags between navigations. */

  setDescription(text: string): void {
    this.meta.updateTag({ name: 'description', content: text });
    this.meta.updateTag({ property: 'og:description', content: text });
    this.meta.updateTag({ name: 'twitter:description', content: text });
  }

  setRobots(value: string): void {
    this.meta.updateTag({ name: 'robots', content: value });
  }

  /** If the path is relative, prefix it with the app URL. */
  private resolveUrl(path: string): string {
    if (path.startsWith('http://') || path.startsWith('https://')) {
      return path;
    }
    const normalized = path.startsWith('/') ? path : `/${path}`;
    return `${environment.appUrl}${normalized}`;
  }

  set(config: Partial<SeoConfig>): void {
    if (config.description !== undefined) {
      this.setDescription(config.description);
    }
    if (config.keywords !== undefined) {
      this.meta.updateTag({ name: 'keywords', content: config.keywords });
    }
    if (config.robots !== undefined) {
      this.setRobots(config.robots);
    }
    if (config.ogType !== undefined) {
      this.meta.updateTag({ property: 'og:type', content: config.ogType });
    }
    if (config.ogImage !== undefined) {
      this.meta.updateTag({ property: 'og:image', content: this.resolveUrl(config.ogImage) });
      this.meta.updateTag({ name: 'twitter:image', content: this.resolveUrl(config.ogImage) });
    }
    if (config.twitterCard !== undefined) {
      this.meta.updateTag({ name: 'twitter:card', content: config.twitterCard });
    }
  }
}
