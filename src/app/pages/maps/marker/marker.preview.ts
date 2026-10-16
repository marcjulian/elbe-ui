import { Component, computed, inject } from '@angular/core';
import { MglMap } from '@elbe-ui/map';
import { MglMarker } from '@elbe-ui/map/marker';
import { ElbTheme } from '@elbe/ui/theme';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'elb-marker-preview',
  imports: [MglMap, MglMarker],
  host: {
    class: 'flex aspect-square md:aspect-video size-full rounded-xl overflow-hidden',
  },
  template: `
    <mgl-map
      class="size-full"
      [mapStyle]="mapStyle()"
      [center]="center"
      [zoom]="8"
      [minZoom]="1"
      [maxZoom]="14"
    >
      <mgl-marker
        [lngLat]="center"
        class="z-20 rounded-full border border-border bg-background px-2.5 py-1 text-xs font-medium shadow-md"
      >
        Marker 1
      </mgl-marker>

      <mgl-marker
        [lngLat]="center"
        [offset]="markerOffset"
        class="z-10 rounded-full border border-border bg-primary px-2.5 py-1 text-xs font-medium text-primary-foreground shadow-md"
      >
        Marker 2
      </mgl-marker>
    </mgl-map>
  `,
})
export class MarkerPreview {
  private readonly _theme = inject(ElbTheme);

  readonly center: [number, number] = [9.9278215, 53.5584587];
  readonly markerOffset: [number, number] = [0, 22];

  mapStyle = computed(() => {
    const base = this._theme.isDark() ? environment.mapDark : environment.mapLight;
    return `${base}?key=${environment.maptilerKey}`;
  });
}
