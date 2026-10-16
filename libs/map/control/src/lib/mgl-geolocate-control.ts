import {
  afterNextRender,
  booleanAttribute,
  Directive,
  inject,
  input,
  output,
} from '@angular/core';
import { MglMapService, keepAvailableObjectValues } from '@elbe-ui/map';
import type { BooleanInput, Position } from '@elbe-ui/map';
import { GeolocateControl } from 'maplibre-gl';
import type { FitBoundsOptions, GeolocateControlOptions } from 'maplibre-gl';
import { MglControl } from './mgl-control';

/**
 * `mglGeolocate` - a geolocate control directive
 *
 * @category Directives
 *
 * @see [GeolocateControl](https://maplibre.org/maplibre-gl-js/docs/API/classes/GeolocateControl)
 */
@Directive({
  selector: '[mglGeolocate]',
})
export class MglGeolocateControl {
  private readonly mapService = inject(MglMapService);
  private readonly controlComponent = inject<MglControl<GeolocateControl>>(MglControl, {
    host: true,
  });

  readonly positionOptions = input<PositionOptions>();
  readonly fitBoundsOptions = input<FitBoundsOptions>();
  readonly trackUserLocation = input<boolean, BooleanInput>(undefined, {
    transform: booleanAttribute,
  });
  readonly showUserLocation = input<boolean, BooleanInput>(undefined, {
    transform: booleanAttribute,
  });

  readonly geolocate = output<Position>();

  constructor() {
    afterNextRender(() => {
      this.mapService.mapCreated$.subscribe(() => {
        if (this.controlComponent.control) {
          throw new Error('Another control is already set for this control');
        }

        const options = keepAvailableObjectValues<GeolocateControlOptions>({
          positionOptions: this.positionOptions(),
          fitBoundsOptions: this.fitBoundsOptions(),
          trackUserLocation: this.trackUserLocation(),
          showUserLocation: this.showUserLocation(),
        });

        const control = new GeolocateControl(options);
        control.on('geolocate', (data) => this.geolocate.emit(data));
        this.controlComponent.control = control;
        this.mapService.addControl(control, this.controlComponent.position());
      });
    });
  }
}
