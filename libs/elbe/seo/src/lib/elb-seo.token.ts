import { inject, InjectionToken, type ValueProvider } from '@angular/core';

export interface SeoConfig {
  /** Site name used as the fallback title and behind `titleTemplate`. */
  title: string;
  /** Title template, e.g. `'%s | elbe/ui'`. `%s` is replaced by the route title. */
  titleTemplate: string;
  /** Absolute site origin used to resolve relative canonical/OG URLs, e.g. `https://elbe-ui.dev`. */
  origin: string;
  description?: string;
  robots?: string;
  ogType?: string;
  ogImage?: string;
  twitterCard?: string;
}

const SeoConfigToken = new InjectionToken<Required<SeoConfig>>('SeoConfig');

export function provideSeoConfig(config: Required<SeoConfig>): ValueProvider {
  return { provide: SeoConfigToken, useValue: config };
}

export function injectSeoConfig(): Required<SeoConfig> {
  return inject(SeoConfigToken);
}

/**
 * Typesafe helper for route data.
 *
 * Usage:
 *   data: { ...meta({ robots: 'noindex, follow' }) }
 */
export function meta(config: Partial<SeoConfig>): { meta: Partial<SeoConfig> } {
  return { meta: config };
}
