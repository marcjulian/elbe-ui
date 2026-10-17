import { afterNextRender, Directive, inject } from '@angular/core';
import { MglMapService } from '@elbe-ui/map';
import { GlobeControl } from 'maplibre-gl';
import { MglControl } from './mgl-control';

/**
 * `mglGlobe` - a globe control directive
 *
 * @category Directives
 *
 * @see [GlobeControl](https://maplibre.org/maplibre-gl-js/docs/API/classes/GlobeControl)
 */
@Directive({
  selector: '[mglGlobe]',
})
export class MglGlobeControl {
  private readonly mapService = inject(MglMapService);
  private readonly controlComponent = inject<MglControl<GlobeControl>>(MglControl, {
    host: true,
  });

  constructor() {
    afterNextRender(() => {
      this.mapService.mapCreated$.subscribe(() => {
        if (this.controlComponent.control) {
          throw new Error('Another control is already set for this control');
        }

        this.controlComponent.control = new GlobeControl();

        this.mapService.addControl(this.controlComponent.control, this.controlComponent.position());
      });
    });
  }
}
