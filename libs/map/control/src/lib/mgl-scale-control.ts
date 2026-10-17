import { afterNextRender, Directive, inject, input, OnChanges, SimpleChanges } from '@angular/core';
import { keepAvailableObjectValues, MglMapService } from '@elbe-ui/map';
import type { ScaleControlOptions, Unit } from 'maplibre-gl';
import { ScaleControl } from 'maplibre-gl';
import { MglControl } from './mgl-control';

/**
 * `mglScale` - a scale control directive
 *
 * @category Directives
 *
 * @see [ScaleControl](https://maplibre.org/maplibre-gl-js/docs/API/classes/ScaleControl)
 */
@Directive({
  selector: '[mglScale]',
})
export class MglScaleControl implements OnChanges {
  private readonly mapService = inject(MglMapService);
  private readonly controlComponent = inject<MglControl<ScaleControl>>(MglControl, {
    host: true,
  });

  readonly maxWidth = input<number>();

  /** Dynamic input */
  readonly unit = input<Unit>();

  constructor() {
    afterNextRender(() => {
      this.mapService.mapCreated$.subscribe(() => {
        if (this.controlComponent.control) {
          throw new Error('Another control is already set for this control');
        }

        const options = keepAvailableObjectValues<ScaleControlOptions>({
          maxWidth: this.maxWidth(),
          unit: this.unit(),
        });

        this.controlComponent.control = new ScaleControl(options);
        this.mapService.addControl(this.controlComponent.control, this.controlComponent.position());
      });
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['unit'] && !changes['unit'].isFirstChange()) {
      (this.controlComponent.control as ScaleControl).setUnit(changes['unit'].currentValue);
    }
  }
}
