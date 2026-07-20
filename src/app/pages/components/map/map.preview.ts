import { Component, computed, inject } from '@angular/core';
import { ElbMapImports } from '@elbe/ui/map';
import { NgxMapLibreGLModule } from '@maplibre/ngx-maplibre-gl';
import { environment } from '../../../../environments/environment';
import { ThemeService } from '../../../tools/theme';

const MapStyles: Record<string, string> = {
  light: 'streets-v4',
  dark: 'streets-v4-dark',
};

@Component({
  selector: 'elb-map-preview',
  imports: [NgxMapLibreGLModule, ElbMapImports],
  host: {
    class: 'flex aspect-square md:aspect-video size-full rounded-xl overflow-hidden',
  },
  template: `
    <mgl-map
      class="size-full"
      [mapStyle]="mapStyle()"
      [center]="[9.9278215, 53.5584587]"
      [zoom]="[8]"
      [minZoom]="1"
      [maxZoom]="14"
    >
      <elb-fullscreen-control />
      <elb-navigation-control />
      <elb-globe-control />

      <mgl-control position="bottom-left">
        <a href="https://www.maptiler.com">
          <img src="https://api.maptiler.com/resources/logo.svg" alt="MapTiler logo" />
        </a>
      </mgl-control>
    </mgl-map>
  `,
})
export class MapPreview {
  private readonly _theme = inject(ThemeService);

  // replace maptiler key with your own
  mapStyle = computed(
    () =>
      `https://api.maptiler.com/maps/${MapStyles[this._theme.theme() || 'light']}/style.json?key=${environment.maptilerKey}`,
  );
}
