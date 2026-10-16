# @elbe-ui/map

Angular components for building maps with [MapLibre](https://maplibre.org), forked from
[`ngx-maplibre-gl`](https://github.com/maplibre/ngx-maplibre-gl). Requires `maplibre-gl` as a peer dependency.

## Entry points

| Import                 | Exports                                                                                                                                          |
| ---------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------ |
| `@elbe-ui/map`         | `MglMap`, `MglMapService`, map types, `ContentStyle`                                                                                             |
| `@elbe-ui/map/marker`  | `MglMarker`, `provideMglMarkerConfig`, `MglMarkerConfig`                                                                                         |
| `@elbe-ui/map/popup`   | `MglPopup`, `provideMglPopupConfig`, `MglPopupConfig`                                                                                            |
| `@elbe-ui/map/control` | `MglControl` + `[mglNavigation]`, `[mglFullscreen]`, `[mglGeolocate]`, `[mglGlobe]`, `[mglScale]`, `[mglAttribution]`, `[mglTerrain]` directives |
| `@elbe-ui/map/core`    | `provideMaplibreWorker`, `MAPLIBRE_WORKER_URL`                                                                                                   |

## Installation

```bash
npm install @elbe-ui/map maplibre-gl
```

MapLibre GL JS v6 requires a web worker. Copy `maplibre-gl-worker.mjs` and
`maplibre-gl-shared.mjs` from `node_modules/maplibre-gl/dist` into your build assets and point the
library at the worker:

```typescript
// app.config.ts
import { provideMaplibreWorker } from '@elbe-ui/map/core';

export const appConfig: ApplicationConfig = {
  providers: [provideMaplibreWorker('maplibre-gl-worker.mjs')],
};
```

## Usage

```ts
import { MglMap } from '@elbe-ui/map';
import { MglMarker, provideMglMarkerConfig } from '@elbe-ui/map/marker';
import { MglPopup } from '@elbe-ui/map/popup';
import { MglControl } from '@elbe-ui/map/control';
```

```html
<mgl-map [mapStyle]="style" [center]="[9.99, 53.55]" [zoom]="12">
  <mgl-marker [lngLat]="[9.99, 53.55]">
    <mgl-popup>Hello from the popup</mgl-popup>
  </mgl-marker>

  <mgl-control position="bottom-left">MapTiler</mgl-control>
  <mgl-control mglNavigation position="top-right"></mgl-control>
</mgl-map>
```

Components declared inside `<mgl-map>` can inject `MglMapService` to reach the `maplibre-gl` map
instance (`mapCreated$` emits once it is ready, and `mapInstance` exposes it).

## Building

```bash
ng build map
```

The build artifacts are placed in `dist/map` as a single package with the entry points above.
