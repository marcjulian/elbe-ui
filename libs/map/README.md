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

## Installation

```bash
npm install maplibre-gl
```

MapLibre GL JS v6 uses a web worker. Serve `maplibre-gl-worker.mjs` and `maplibre-gl-shared.mjs` by
adding them to your project's assets (the map loads `maplibre-gl-worker.mjs` relative to the app base
URL):

```json
"assets": [
  {
    "glob": "maplibre-gl-worker.mjs",
    "input": "node_modules/maplibre-gl/dist",
    "output": "/"
  },
  {
    "glob": "maplibre-gl-shared.mjs",
    "input": "node_modules/maplibre-gl/dist",
    "output": "/"
  }
]
```

## Usage

```ts
import { MglMap } from '@elbe-ui/map';
import { MglMarker, provideMglMarkerConfig } from '@elbe-ui/map/marker';
import { MglPopup } from '@elbe-ui/map/popup';
import { MglControl } from '@elbe-ui/map/control';
```

`MglMap`, `MglMarker` and `MglPopup` are directives (each exposes an `exportAs` — `mglMap`, `mglMarker`, `mglPopup`). `MglMap` uses **its host element** as the MapLibre container, so the element must be sized. Every usage accepts either the element or the attribute form:

```html
<mgl-map class="size-full" [mapStyle]="style" [center]="[9.99, 53.55]" [zoom]="12">
  <mgl-marker [lngLat]="[9.99, 53.55]" #marker="mglMarker">Hamburg</mgl-marker>
  <mgl-popup [marker]="marker">Hello from the popup</mgl-popup>

  <mgl-control position="bottom-left">MapTiler</mgl-control>
  <mgl-control mglNavigation position="top-right"></mgl-control>
</mgl-map>

<!-- or attach the map to any existing element -->
<div class="size-full" mglMap [mapStyle]="style" [center]="[9.99, 53.55]" [zoom]="12"></div>
```

Markers and popups use their host element as the MapLibre element, so style/annotate the host directly. Components declared inside the map element can inject `MglMapService` to reach the `maplibre-gl` map
instance (`mapCreated$` emits once it is ready, and `mapInstance` exposes it).


## Building

```bash
ng build map
```

The build artifacts are placed in `dist/map` as a single package with the entry points above.
