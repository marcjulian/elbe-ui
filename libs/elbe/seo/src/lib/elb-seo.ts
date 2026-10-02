import { DOCUMENT } from '@angular/common';
import { inject, Service } from '@angular/core';
import { Meta } from '@angular/platform-browser';
import { injectSeoConfig, type SeoConfig } from './elb-seo.token';

@Service()
export class ElbSeo {
  private readonly document = inject(DOCUMENT);
  private readonly meta = inject(Meta);
  private readonly config = injectSeoConfig();

  /**
   * Called by the title strategy on every navigation.
   * Writes all managed tags, merging the route config with sensible defaults.
   */
  applyFromStrategy(config: SeoConfig, fullTitle: string, url: string): void {
    const merged = { ...this.config, ...config };

    this.updateMeta({ name: 'description' }, merged.description);
    this.updateMeta({ name: 'robots' }, merged.robots);

    this.meta.updateTag({ property: 'og:title', content: fullTitle });
    this.updateMeta({ property: 'og:description' }, merged.description);
    this.updateMeta({ property: 'og:type' }, merged.ogType);
    if (merged.ogImage) {
      this.meta.updateTag({ property: 'og:image', content: this.resolveUrl(merged.ogImage) });
    }
    this.meta.updateTag({ property: 'og:url', content: this.resolvePageUrl(url) });

    this.updateMeta({ name: 'twitter:card' }, merged.twitterCard);
    this.meta.updateTag({ name: 'twitter:title', content: fullTitle });
    this.updateMeta({ name: 'twitter:description' }, merged.description);
    if (merged.ogImage) {
      this.meta.updateTag({ name: 'twitter:image', content: this.resolveUrl(merged.ogImage) });
    }
  }

  /** Upsert a meta tag only when a value is present (avoids `content="undefined"`). */
  private updateMeta(
    selector: { name: string } | { property: string },
    content: string | undefined,
  ): void {
    if (content !== undefined) {
      this.meta.updateTag({ ...selector, content });
    }
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

  /**
   * Sets the canonical link in the header.
   * It supposes the header link is already present in the index.html
   */
  setCanonical(url: string): void {
    const fullPath = this.resolvePageUrl(url);
    this.document.querySelector('link[rel=canonical]')?.setAttribute('href', fullPath);
  }

  /** Resolve a router URL to an absolute, fragment-free URL. */
  private resolvePageUrl(url: string): string {
    return this.resolveUrl(url.split('#')[0]);
  }

  /** If the path is relative, prefix it with the configured site origin. */
  private resolveUrl(path: string): string {
    if (path.startsWith('http://') || path.startsWith('https://')) {
      return path;
    }
    const normalized = path.startsWith('/') ? path : `/${path}`;
    return `${this.config.origin}${normalized}`;
  }

  set(config: Partial<SeoConfig>): void {
    if (config.description !== undefined) {
      this.setDescription(config.description);
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
