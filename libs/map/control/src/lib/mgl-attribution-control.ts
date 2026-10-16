import { afterNextRender, booleanAttribute, Directive, inject, input } from '@angular/core';
import { MglMapService, keepAvailableObjectValues } from '@elbe-ui/map';
import type { BooleanInput } from '@elbe-ui/map';
import { AttributionControl } from 'maplibre-gl';
import type { AttributionControlOptions } from 'maplibre-gl';
import { MglControl } from './mgl-control';

/**
 * `mglAttribution` - an attribution control directive
 *
 * @category Directives
 *
 * @see [AttributionControl](https://maplibre.org/maplibre-gl-js/docs/API/classes/AttributionControl)
 */
@Directive({
  selector: '[mglAttribution]',
})
export class MglAttributionControl {
  private readonly mapService = inject(MglMapService);
  private readonly controlComponent = inject<MglControl<AttributionControl>>(MglControl, {
    host: true,
  });

  readonly compact = input<boolean, BooleanInput>(undefined, {
    transform: booleanAttribute,
  });
  readonly customAttribution = input<string | string[]>();

  constructor() {
    afterNextRender(() => {
      this.mapService.mapCreated$.subscribe(() => {
        if (this.controlComponent.control) {
          throw new Error('Another control is already set for this control');
        }

        const options = keepAvailableObjectValues<AttributionControlOptions>({
          compact: this.compact(),
          customAttribution: this.customAttribution(),
        });

        this.controlComponent.control = new AttributionControl(options);
        this.mapService.addControl(
          this.controlComponent.control,
          this.controlComponent.position(),
        );
      });
    });
  }
}
