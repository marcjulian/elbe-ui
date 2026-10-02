import { makeEnvironmentProviders, type EnvironmentProviders } from '@angular/core';
import { provideSeoTitleStrategy } from './elb-seo-title.strategy';
import { provideSeoConfig, type SeoConfig } from './elb-seo.token';

/**
 * Registers the SEO config and the router title strategy in a single call.
 *
 * Must be listed after `provideRouter(...)` so the custom strategy overrides
 * the router's default `TitleStrategy`.
 */
export function provideSeo(config: Required<SeoConfig>): EnvironmentProviders {
  return makeEnvironmentProviders([provideSeoConfig(config), provideSeoTitleStrategy()]);
}
