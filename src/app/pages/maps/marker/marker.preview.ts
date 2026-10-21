import { Component } from '@angular/core';
import { MglMap } from '@elbe-ui/map';
import { MglMarker } from '@elbe-ui/map/marker';
import { injectMapStyle } from '../../../map-style';

@Component({
  selector: 'elb-marker-preview',
  imports: [MglMap, MglMarker],
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
      <mgl-marker
        [lngLat]="center"
        class="border-border bg-background z-20 rounded-full border px-2.5 py-1 text-xs font-medium shadow-md"
      >
        Marker 1
      </mgl-marker>

      <mgl-marker
        [lngLat]="center"
        [offset]="markerOffset"
        class="border-border bg-primary text-primary-foreground z-10 rounded-full border px-2.5 py-1 text-xs font-medium shadow-md"
      >
        Marker 2
      </mgl-marker>
    </mgl-map>
  `,
})
export class MarkerPreview {
  protected readonly _mapStyle = injectMapStyle();

  readonly center: [number, number] = [9.9278215, 53.5584587];
  readonly markerOffset: [number, number] = [0, 22];
}
