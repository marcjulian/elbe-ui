import { Component } from '@angular/core';
import { MglMap } from '@elbe-ui/map';
import { MglControl } from '@elbe-ui/map/control';
import { ElbMapImports } from '@elbe/ui/map';
import { injectMapStyle } from '../../../map-style';

@Component({
  selector: 'elb-map-controls-preview',
  imports: [MglMap, MglControl, ElbMapImports],
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
      <elb-fullscreen-control />
      <elb-geolocate-control />
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
export class MapControlsPreview {
  protected readonly _mapStyle = injectMapStyle();

  readonly center: [number, number] = [9.9278215, 53.5584587];
}
