import { inject, InjectionToken, type Provider } from '@angular/core';

/** Title template: every `%s` is replaced, or use a function for full control. */
export type TitleTemplate = string | ((title: string) => string);

export interface SeoConfig {
  /** Site name used as the fallback title and behind `titleTemplate`. */
  title: string;
  /** Title template, e.g. `'%s | elbe/ui'`. All `%s` are replaced by the route title. */
  titleTemplate: TitleTemplate;
  /** Absolute site origin used to resolve relative canonical/OG URLs, e.g. `https://elbe-ui.dev`. */
  origin: string;
  description?: string;
  robots?: string;
  ogType?: string;
  ogImage?: string;
  twitterCard?: string;
}

const SeoConfigToken = new InjectionToken<SeoConfig>('SeoConfig');

/** Factory form, for configs whose values are only known at runtime (e.g. injected). */
export type SeoConfigFactory = () => SeoConfig;

export function provideSeoConfig(config: SeoConfig | SeoConfigFactory): Provider {
  return typeof config === 'function'
    ? { provide: SeoConfigToken, useFactory: config }
    : { provide: SeoConfigToken, useValue: config };
}

export function injectSeoConfig(): SeoConfig {
  return inject(SeoConfigToken);
}

/** Resolve a title template against a page title. */
export function resolveTitleTemplate(template: TitleTemplate, title: string): string {
  return typeof template === 'function' ? template(title) : template.replaceAll('%s', title);
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
