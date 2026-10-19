import { Component, computed, inject, signal } from '@angular/core';
import { MglMap } from '@elbe-ui/map';
import { MglLayer } from '@elbe-ui/map/layer';
import { MglPopup, provideMglPopupConfig } from '@elbe-ui/map/popup';
import { MglGeoJSONSource } from '@elbe-ui/map/source';
import { ElbTheme } from '@elbe/ui/theme';
import type { MapLayerMouseEvent } from 'maplibre-gl';
import { environment } from '../../../../environments/environment';

type SelectedPlace = GeoJSON.Feature<GeoJSON.Point>;

@Component({
  selector: 'elb-source-preview',
  imports: [MglMap, MglGeoJSONSource, MglLayer, MglPopup],
  providers: [
    provideMglPopupConfig({
      closeButton: false,
      offset: 16,
      className:
        'popup-tip:invisible max-w-none! popup-content:bg-popover popup-content:rounded-xl popup-content:overflow-hidden popup-content:p-0 popup-content:shadow popup-content:ring-1 popup-content:ring-gray-950/5',
    }),
  ],
  host: {
    class: 'flex aspect-square md:aspect-video size-full rounded-xl overflow-hidden',
  },
  template: `
    <mgl-map
      class="size-full"
      [mapStyle]="mapStyle()"
      [center]="center"
      [zoom]="10"
      [minZoom]="1"
      [maxZoom]="16"
    >
      <mgl-geojson-source id="source-demo" [data]="data" />

      <mgl-layer
        [id]="layerId"
        type="circle"
        source="source-demo"
        [paint]="{
          'circle-radius': 9,
          'circle-color': '#009689',
          'circle-stroke-color': '#ffffff',
          'circle-stroke-width': 2,
        }"
        (layerClick)="showPopup($event)"
      />

      @if (selected(); as place) {
        <mgl-popup [feature]="place" class="flex flex-col gap-1 p-4">
          <p class="text-sm font-medium">{{ place.properties?.['name'] }}</p>
          <p class="text-muted-foreground text-xs">GeoJSON feature</p>
        </mgl-popup>
      }
    </mgl-map>
  `,
})
export class SourcePreview {
  private readonly _theme = inject(ElbTheme);

  readonly center: [number, number] = [9.9278215, 53.5584587];

  readonly layerId = 'source-demo-points';

  readonly selected = signal<SelectedPlace | null>(null);

  readonly data: GeoJSON.FeatureCollection<GeoJSON.Point> = {
    type: 'FeatureCollection',
    features: [
      {
        type: 'Feature',
        geometry: { type: 'Point', coordinates: [9.9937, 53.5511] },
        properties: { name: 'Hamburg' },
      },
      {
        type: 'Feature',
        geometry: { type: 'Point', coordinates: [10.0015, 53.5461] },
        properties: { name: 'HafenCity' },
      },
      {
        type: 'Feature',
        geometry: { type: 'Point', coordinates: [9.9658, 53.557] },
        properties: { name: 'St. Pauli' },
      },
    ],
  };

  mapStyle = computed(() => {
    const base = this._theme.isDark() ? environment.mapDark : environment.mapLight;
    return `${base}?key=${environment.maptilerKey}`;
  });

  showPopup(event: MapLayerMouseEvent) {
    this.selected.set(event.features![0] as GeoJSON.Feature<GeoJSON.Point>);
  }
}
