import { inject, InjectionToken, type Provider } from '@angular/core';

export interface ThemeConfig {
  /** Class added to `<html>` when the dark theme is active. Defaults to `'dark'`. */
  darkClass: string;
  /** `content` of the `theme-color` meta tag in the light theme. Defaults to `'#ffffff'`. */
  lightColor: string;
  /** `content` of the `theme-color` meta tag in the dark theme. Defaults to `'#0a0a0a'`. */
  darkColor: string;
}

const defaultConfig: ThemeConfig = {
  darkClass: 'dark',
  lightColor: '#ffffff',
  darkColor: '#0a0a0a',
};

const ThemeConfigToken = new InjectionToken<ThemeConfig>('ThemeConfig');

/** Factory form, for configs whose values are only known at runtime (e.g. injected). */
export type ThemeConfigFactory = () => Partial<ThemeConfig>;

export function provideThemeConfig(config: Partial<ThemeConfig> | ThemeConfigFactory): Provider {
  return typeof config === 'function'
    ? { provide: ThemeConfigToken, useFactory: () => ({ ...defaultConfig, ...config() }) }
    : { provide: ThemeConfigToken, useValue: { ...defaultConfig, ...config } };
}

export function injectThemeConfig(): ThemeConfig {
  return inject(ThemeConfigToken, { optional: true }) ?? defaultConfig;
}
