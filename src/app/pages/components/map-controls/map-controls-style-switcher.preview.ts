import { Component, inject } from '@angular/core';
import { MglMap } from '@elbe-ui/map';
import { ElbMapImports } from '@elbe/ui/map';
import { provideIcons } from '@ng-icons/core';
import { lucideMap, lucideSatellite } from '@ng-icons/lucide';
import { injectMapStyle, MapStyleService } from '../../../map-style';
import { mapStyleOptions } from './map-controls.styles';

@Component({
  selector: 'elb-style-switcher-preview',
  imports: [MglMap, ElbMapImports],
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
      <elb-style-switcher
        position="top-right"
        [options]="styleOptions"
        [value]="_styleService.styleName()"
        (valueChange)="_styleService.setStyle($event)"
      />
    </mgl-map>
  `,
})
export class StyleSwitcherPreview {
  protected readonly _mapStyle = injectMapStyle();
  protected readonly _styleService = inject(MapStyleService);

  readonly center: [number, number] = [9.9278215, 53.5584587];

  protected readonly styleOptions = mapStyleOptions.slice(0, 2);
}
