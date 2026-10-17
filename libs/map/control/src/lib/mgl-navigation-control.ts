import type { BooleanInput } from '@angular/cdk/coercion';
import { afterNextRender, booleanAttribute, Directive, inject, input } from '@angular/core';
import { keepAvailableObjectValues, MglMapService } from '@elbe-ui/map';
import type { NavigationControlOptions } from 'maplibre-gl';
import { NavigationControl } from 'maplibre-gl';
import { MglControl } from './mgl-control';

/**
 * `mglNavigation` - a navigation control directive
 *
 * @category Directives
 *
 * @see [NavigationControl](https://maplibre.org/maplibre-gl-js/docs/API/classes/NavigationControl)
 */
@Directive({
  selector: '[mglNavigation]',
})
export class MglNavigationControl {
  private readonly mapService = inject(MglMapService);
  private readonly controlComponent = inject<MglControl<NavigationControl>>(MglControl, {
    host: true,
  });

  readonly showCompass = input<boolean, BooleanInput>(undefined, {
    transform: booleanAttribute,
  });
  readonly showZoom = input<boolean, BooleanInput>(undefined, {
    transform: booleanAttribute,
  });
  readonly visualizePitch = input<boolean, BooleanInput>(undefined, {
    transform: booleanAttribute,
  });
  readonly visualizeRoll = input<boolean, BooleanInput>(undefined, {
    transform: booleanAttribute,
  });

  constructor() {
    afterNextRender(() => {
      this.mapService.mapCreated$.subscribe(() => {
        if (this.controlComponent.control) {
          throw new Error('Another control is already set for this control');
        }

        const options = keepAvailableObjectValues<NavigationControlOptions>({
          showCompass: this.showCompass(),
          showZoom: this.showZoom(),
          visualizePitch: this.visualizePitch(),
          visualizeRoll: this.visualizeRoll(),
        });

        this.controlComponent.control = new NavigationControl(options);
        this.mapService.addControl(this.controlComponent.control, this.controlComponent.position());
      });
    });
  }
}
