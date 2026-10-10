import { inject, InjectionToken, type Provider } from '@angular/core';

/** Title template: every `%s` is replaced, or use a function for full control. */
export type TitleTemplate = string | ((title: string) => string);

/** A single `rel="alternate"` language alternate link for a translated page. */
export interface LanguageAlternate {
  /** BCP-47 language tag, e.g. `'en-GB'`, or `'x-default'` for the fallback. */
  hreflang: string;
  /** Absolute URL, or a path resolved against the configured `origin`, e.g. `/de`. */
  href: string;
}

export interface SeoConfig {
  /** Site name used as the fallback title and behind `titleTemplate`. */
  title: string;
  /**
   * Site name emitted as `og:site_name`, shown above the title in link cards.
   * Defaults to nothing (the tag is omitted) when unset.
   */
  siteName?: string;
  /** Title template, e.g. `'%s | elbe/ui'`. All `%s` are replaced by the route title. */
  titleTemplate: TitleTemplate;
  /** Absolute site origin used to resolve relative canonical/OG URLs, e.g. `https://elbe-ui.dev`. */
  origin: string;
  description?: string;
  robots?: string;
  /**
   * BCP-47 language tag written to `<html lang>`, e.g. `'en'` or `'en-GB'`.
   * Does not affect `og:locale` — set that separately.
   */
  lang?: string;
  /**
   * Open Graph locale written to `<meta property="og:locale">`, e.g. `'en_US'`.
   * Uses the `language_TERRITORY` form, which differs from {@link SeoConfig.lang}.
   */
  ogLocale?: string;
  /**
   * `rel="alternate"` language alternate links for translated versions of the page. The
   * set is replaced as a whole on every navigation, so locales that are no longer present
   * are removed. Include a self-reference and an `'x-default'` entry for best results.
   */
  languageAlternates?: LanguageAlternate[];
  ogType?: string;
  ogImage?: string;
  /** Intrinsic width of `ogImage` in pixels, emitted as `og:image:width`. */
  ogImageWidth?: number;
  /** Intrinsic height of `ogImage` in pixels, emitted as `og:image:height`. */
  ogImageHeight?: number;
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
