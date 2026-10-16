import { afterNextRender, Directive, inject, input } from '@angular/core';
import { MglMapService } from '@elbe-ui/map';
import { FullscreenControl } from 'maplibre-gl';
import { MglControl } from './mgl-control';

/**
 * `mglFullscreen` - a fullscreen control directive
 *
 * @category Directives
 *
 * @see [FullscreenControl](https://maplibre.org/maplibre-gl-js/docs/API/classes/FullscreenControl)
 */
@Directive({
  selector: '[mglFullscreen]',
  host: {
    '(window:webkitfullscreenchange)': 'onFullscreen()',
  },
})
export class MglFullscreenControl {
  private readonly mapService = inject(MglMapService);
  private readonly controlComponent = inject<MglControl<FullscreenControl>>(MglControl, {
    host: true,
  });

  readonly container = input<HTMLElement>();

  constructor() {
    afterNextRender(() => {
      this.mapService.mapCreated$.subscribe(() => {
        if (this.controlComponent.control) {
          throw new Error('Another control is already set for this control');
        }
        this.controlComponent.control = new FullscreenControl({
          container: this.container(),
        });
        this.mapService.addControl(
          this.controlComponent.control,
          this.controlComponent.position(),
        );
      });
    });
  }

  onFullscreen() {
    this.mapService.mapInstance.resize();
  }
}
