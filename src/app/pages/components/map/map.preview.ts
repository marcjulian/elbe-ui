import { Component, computed, inject } from '@angular/core';
import { MglMap } from '@elbe-ui/map';
import { MglControl } from '@elbe-ui/map/control';
import { MglMarker } from '@elbe-ui/map/marker';
import { MglPopup } from '@elbe-ui/map/popup';
import { ElbMapImports } from '@elbe/ui/map';
import { ElbTheme } from '@elbe/ui/theme';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'elb-map-preview',
  imports: [MglMap, MglControl, MglMarker, MglPopup, ElbMapImports],
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
      <elb-fullscreen-control />
      <elb-geolocate-control />
      <elb-navigation-control />
      <elb-globe-control />

      <!--
        Two markers at the same position to exercise host-class z-index stacking.
        Marker 2 is pushed below via [offset] and sits underneath (z-10 < z-20).
        Raise Marker 2 to z-30 (or drop Marker 1's z-index) to bring it on top.
      -->
      <mgl-marker
        [lngLat]="center"
        #marker="mglMarker"
        class="z-10 rounded-full border border-border bg-background px-2.5 py-1 text-xs font-medium shadow-md"
      >
        Marker 1
      </mgl-marker>

      <mgl-marker
        [lngLat]="center"
        [offset]="markerOffset"
        class="rounded-full border border-border bg-primary px-2.5 py-1 text-xs font-medium text-primary-foreground shadow-md"
      >
        Marker 2
      </mgl-marker>

      <mgl-popup [marker]="marker" [offset]="28">
        <p class="text-sm font-medium">Hello from Hamburg 👋</p>
      </mgl-popup>

      <mgl-control position="bottom-left">
        <a href="https://www.maptiler.com">
          <img src="https://api.maptiler.com/resources/logo.svg" alt="MapTiler logo" />
        </a>
      </mgl-control>
    </mgl-map>
  `,
})
export class MapPreview {
  private readonly _theme = inject(ElbTheme);

  readonly center: [number, number] = [9.9278215, 53.5584587];
  readonly markerOffset: [number, number] = [0, 22];

  mapStyle = computed(() => {
    const base = this._theme.isDark() ? environment.mapDark : environment.mapLight;
    return `${base}?key=${environment.maptilerKey}`;
  });
}
