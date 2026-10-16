import { InjectionToken, type Provider } from '@angular/core';

/**
 * Injection token for the MapLibre GL JS worker URL, applied via `setWorkerUrl()`
 * by `<mgl-map>` before the first map is created.
 *
 * Prefer {@link provideMaplibreWorker} over using this token directly.
 */
export const MAPLIBRE_WORKER_URL = new InjectionToken<string>('elbe-ui maplibre worker URL');

/**
 * Provides the URL of the MapLibre GL JS web worker script
 * (`maplibre-gl-worker.mjs`). The `setWorkerUrl()` call is deferred until the
 * first `<mgl-map>` is set up, keeping `maplibre-gl` out of the initial bundle.
 *
 * Relative URLs are resolved against `document.baseURI` so sub-path deployments
 * (`--base-href`) work. The worker file and `maplibre-gl-shared.mjs` must be
 * served at that location (typically via `angular.json` `assets`).
 *
 * @example
 * ```typescript
 * // app.config.ts
 * export const appConfig: ApplicationConfig = {
 *   providers: [provideMaplibreWorker('maplibre-gl-worker.mjs')],
 * };
 * ```
 */
export function provideMaplibreWorker(workerUrl: string): Provider {
  return { provide: MAPLIBRE_WORKER_URL, useValue: workerUrl };
}
