import { Component, computed, inject } from '@angular/core';
import { MglMap } from '@elbe-ui/map';
import { MglControl, MglNavigationControl } from '@elbe-ui/map/control';
import { ElbTheme } from '@elbe/ui/theme';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'elb-map-preview',
  imports: [MglMap, MglControl, MglNavigationControl],
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
      <mgl-control mglNavigation position="top-right"></mgl-control>

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

  mapStyle = computed(() => {
    const base = this._theme.isDark() ? environment.mapDark : environment.mapLight;
    return `${base}?key=${environment.maptilerKey}`;
  });
}
