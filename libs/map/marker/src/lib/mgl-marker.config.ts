import { InjectionToken, inject, type ValueProvider } from '@angular/core';
import type { MarkerOptions } from 'maplibre-gl';

/**
 * Default options applied to every `mgl-marker` in the injector scope.
 *
 * All MapLibre marker options except `element` and `className` are supported —
 * the host element is the marker element, so style/annotate it (including its
 * classes) directly. A marker can still override any option through its inputs.
 *
 * @category Directives
 */
export type MglMarkerConfig = Omit<MarkerOptions, 'element' | 'className'>;

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
 * @category Directives
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
 * @category Directives
 */
export function injectMglMarkerConfig(): MglMarkerConfig {
  return inject(MGL_MARKER_CONFIG, { optional: true }) ?? defaultConfig;
}
