import { Component } from '@angular/core';
import { MglMap } from '@elbe-ui/map';
import {
  MglClusterPointTemplate,
  MglMarkerCluster,
  MglPointTemplate,
} from '@elbe-ui/map/marker-cluster';
import { MglGeoJSONSource } from '@elbe-ui/map/source';
import { injectMapStyle } from '../../../map-style';

const range = (length: number) => Array.from({ length }, (_, index) => index);

@Component({
  selector: 'elb-cluster-preview',
  imports: [MglMap, MglGeoJSONSource, MglMarkerCluster, MglPointTemplate, MglClusterPointTemplate],
  host: {
    class: 'flex aspect-square md:aspect-video size-full rounded-xl overflow-hidden',
  },
  template: `
    <mgl-map
      class="size-full"
      [mapStyle]="_mapStyle()"
      [center]="center"
      [zoom]="8"
      [minZoom]="1"
      [maxZoom]="14"
    >
      <mgl-geojson-source
        id="cluster-demo"
        [data]="data"
        [cluster]="true"
        [clusterRadius]="50"
        [clusterMaxZoom]="14"
      />

      <mgl-marker-cluster source="cluster-demo">
        <ng-template mglPoint>
          <span class="bg-primary block size-2.5 rounded-full border border-white shadow"></span>
        </ng-template>

        <ng-template mglClusterPoint let-feature>
          <span
            class="bg-primary text-primary-foreground flex size-9 items-center justify-center rounded-full border-2 border-white text-xs font-semibold shadow"
          >
            {{ feature.properties?.['point_count'] }}
          </span>
        </ng-template>
      </mgl-marker-cluster>
    </mgl-map>
  `,
})
export class ClusterPreview {
  protected readonly _mapStyle = injectMapStyle();

  readonly center: [number, number] = [9.9278215, 53.5584587];

  /** 7 x 9 grid, 0.05° apart, so the source clusters at low zoom. */
  readonly data: GeoJSON.FeatureCollection<GeoJSON.Point> = {
    type: 'FeatureCollection',
    features: range(7).flatMap((row) =>
      range(9).map((col): GeoJSON.Feature<GeoJSON.Point> => ({
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: [this.center[0] + (col - 4) * 0.05, this.center[1] + (row - 3) * 0.05],
        },
        properties: { id: row * 9 + col },
      })),
    ),
  };
}
