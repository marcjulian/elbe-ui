import { InjectionToken, inject, type ValueProvider } from '@angular/core';
import type { ContentStyle } from '@elbe-ui/map';
import type { MarkerOptions } from 'maplibre-gl';

/**
 * Default options applied to every `mgl-marker` in the injector scope.
 *
 * All MapLibre marker options except `element` are supported. `className` and
 * `contentStyle` are applied to the inner marker element. A marker can still
 * override any option through its inputs.
 *
 * @category Components
 */
export type MglMarkerConfig = Omit<MarkerOptions, 'element'> & {
  contentStyle?: ContentStyle;
};

const defaultConfig: MglMarkerConfig = {};

/**
 * Injection token holding the {@link MglMarkerConfig}. Prefer
 * {@link provideMglMarkerConfig} over using this token directly.
 *
 * @category Directives
 */
export const MGL_MARKER_CONFIG = new InjectionToken<MglMarkerConfig>('MglMarkerConfig');

/**
 * Provides default options for every `mgl-marker` within the injector scope.
 * Explicit inputs on an individual `mgl-marker` take precedence.
 *
 * @example
 * ```typescript
 * // app.config.ts
 * export const appConfig: ApplicationConfig = {
 *   providers: [provideMglMarkerConfig({ offset: [0, -14] })],
 * };
 * ```
 *
 * @category Components
 */
export function provideMglMarkerConfig(config: Partial<MglMarkerConfig>): ValueProvider {
  return {
    provide: MGL_MARKER_CONFIG,
    useValue: { ...defaultConfig, ...config },
  };
}

/**
 * Reads the current {@link MglMarkerConfig}, falling back to an empty config
 * when none was provided.
 *
 * @category Components
 */
export function injectMglMarkerConfig(): MglMarkerConfig {
  return inject(MGL_MARKER_CONFIG, { optional: true }) ?? defaultConfig;
}
