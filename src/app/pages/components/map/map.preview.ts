import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ElbMapImports } from '@elbe/ui/map';
import { NgxMapLibreGLModule } from '@maplibre/ngx-maplibre-gl';

@Component({
  selector: 'elb-map-preview',
  imports: [NgxMapLibreGLModule, ElbMapImports],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'flex aspect-video size-full rounded-md overflow-hidden' },
  template: `
    <mgl-map
      class="size-full"
      [mapStyle]="'https://api.maptiler.com/maps/streets-v4/style.json?key=' + maptilerKey"
    >
      <elb-fullscreen-control />
      <elb-navigation-control />
      <elb-globe-control />
    </mgl-map>
  `,
})
export class MapPreview {
  // TODO replace with your own key
  maptilerKey = 'rObRf3wgR040OguVX5YE';
}
