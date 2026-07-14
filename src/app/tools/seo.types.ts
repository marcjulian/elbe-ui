export interface SeoConfig {
  description?: string;
  keywords?: string;
  robots?: string;
  ogType?: string;
  ogImage?: string;
  twitterCard?: string;
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
