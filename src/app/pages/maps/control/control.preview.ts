import { Component } from '@angular/core';
import { MglMap } from '@elbe-ui/map';
import { MglControl, MglNavigationControl, MglScaleControl } from '@elbe-ui/map/control';
import { injectMapStyle } from '../../../map-style';

@Component({
  selector: 'elb-control-preview',
  imports: [MglMap, MglControl, MglNavigationControl, MglScaleControl],
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
      <mgl-control mglNavigation position="top-right"></mgl-control>
      <mgl-control mglScale unit="metric" position="bottom-right"></mgl-control>

      <mgl-control position="bottom-left">
        <a href="https://www.maptiler.com">
          <img src="https://api.maptiler.com/resources/logo.svg" alt="MapTiler logo" />
        </a>
      </mgl-control>
    </mgl-map>
  `,
})
export class ControlPreview {
  protected readonly _mapStyle = injectMapStyle();

  readonly center: [number, number] = [9.9278215, 53.5584587];
}
