import { Component, inject } from '@angular/core';
import { MglMap } from '@elbe-ui/map';
import { MglControl } from '@elbe-ui/map/control';
import { ElbMapImports } from '@elbe/ui/map';
import { provideIcons } from '@ng-icons/core';
import { lucideMap, lucideSatellite } from '@ng-icons/lucide';
import { injectMapStyle, MapStyleService } from '../../../map-style';
import { mapStyleOptions } from './map-controls.styles';

@Component({
  selector: 'elb-map-controls-preview',
  imports: [MglMap, MglControl, ElbMapImports],
  providers: [provideIcons({ lucideMap, lucideSatellite })],
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
      <elb-style-switcher
        position="top-right"
        orientation="vertical"
        [options]="styleOptions"
        [value]="_styleService.styleName()"
        (valueChange)="_styleService.setStyle($event)"
      />

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
  protected readonly _styleService = inject(MapStyleService);

  readonly center: [number, number] = [9.9278215, 53.5584587];

  protected readonly styleOptions = mapStyleOptions.slice(0, 2);
}
