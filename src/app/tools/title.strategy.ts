import { type ClassProvider, inject, Injectable } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { type RouterStateSnapshot, TitleStrategy } from '@angular/router';
import { config } from '../config';
import { Seo } from './seo';
import type { SeoConfig } from './seo.types';

@Injectable()
export class AppTitleStrategy extends TitleStrategy {
  private readonly title = inject(Title);
  private readonly seo = inject(Seo);

  updateTitle(snapshot: RouterStateSnapshot): void {
    // PageTitle is equal to the "Title" of a route if it's set
    // If its not set it will use the "title" given in index.html
    const pageTitle = this.buildTitle(snapshot);

    let title = [config.name];
    if (pageTitle) {
      title.unshift(pageTitle);
    } else {
      title.push(config.description);
    }
    const fullTitle = title.join(' - ');
    this.title.setTitle(fullTitle);

    this.seo.setCanonical(snapshot.url);

    const mergedSeo = this.collectSeoConfig(snapshot);
    this.seo.applyFromStrategy(mergedSeo, fullTitle);
  }

  /** Walk the activated route chain, merging parent→child data.meta (child wins). */
  private collectSeoConfig(snapshot: RouterStateSnapshot): SeoConfig {
    let config: SeoConfig = {};
    let route = snapshot.root;
    while (route) {
      const routeMeta = route.data['meta'] as SeoConfig | undefined;
      if (routeMeta) {
        config = { ...config, ...routeMeta };
      }
      route = route.firstChild!;
    }
    return config;
  }
}

export function provideTitleStrategy(): ClassProvider {
  return { provide: TitleStrategy, useClass: AppTitleStrategy };
}
