import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ElbMapImports } from '@elbe/ui/map';
import { NgxMapLibreGLModule } from '@maplibre/ngx-maplibre-gl';

@Component({
  selector: 'elb-map-preview',
  imports: [NgxMapLibreGLModule, ElbMapImports],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'flex aspect-square md:aspect-video size-full rounded-xl overflow-hidden relative',
  },
  template: `
    <mgl-map
      class="size-full"
      [mapStyle]="'https://api.maptiler.com/maps/streets-v4/style.json?key=' + maptilerKey"
      [center]="[9.9278215, 53.5584587]"
      [zoom]="[8]"
      [minZoom]="6"
      [maxZoom]="14"
    >
      <elb-fullscreen-control />
      <elb-navigation-control />
      <elb-globe-control />
    </mgl-map>

    <a href="https://www.maptiler.com" class="absolute bottom-2.5 left-2.5 z-10">
      <img src="https://api.maptiler.com/resources/logo.svg" alt="MapTiler logo" />
    </a>
  `,
})
export class MapPreview {
  // TODO replace with your own key
  maptilerKey = 'IzR0Y1rL7idlJ8Mya3mw';
}
