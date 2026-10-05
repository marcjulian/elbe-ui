import { makeEnvironmentProviders, type EnvironmentProviders } from '@angular/core';
import { provideThemeConfig, type ThemeConfig, type ThemeConfigFactory } from './elb-theme.token';

/**
 * Registers the theme config.
 *
 * Optional: without it, `ElbTheme` falls back to the default config
 * (`darkClass: 'dark'`).
 */
export function provideTheme(
  config: Partial<ThemeConfig> | ThemeConfigFactory,
): EnvironmentProviders {
  return makeEnvironmentProviders([provideThemeConfig(config)]);
}
