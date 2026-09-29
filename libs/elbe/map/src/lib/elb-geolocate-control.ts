import type { BooleanInput } from '@angular/cdk/coercion';
import {
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  input,
  output,
  viewChild,
} from '@angular/core';
import { ControlComponent, GeolocateControlDirective, Position } from '@maplibre/ngx-maplibre-gl';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideLocateFixed } from '@ng-icons/lucide';
import { HlmButton } from '@spartan-ng/helm/button';
import type { ControlPosition, GeolocateControl as MaplibreGeolocateControl } from 'maplibre-gl';

@Component({
  selector: 'elb-geolocate-control',
  imports: [ControlComponent, GeolocateControlDirective, HlmButton, NgIcon],
  providers: [provideIcons({ lucideLocateFixed })],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <mgl-control
      mglGeolocate
      #geolocateControl
      [trackUserLocation]="true"
      [positionOptions]="{ enableHighAccuracy: true }"
      (geolocate)="geolocate.emit($event)"
    />

    <mgl-control [position]="position()">
      <button
        hlmBtn
        variant="outline"
        size="icon-sm"
        type="button"
        aria-label="Geolocate"
        class="dark:bg-background dark:hover:bg-background/80"
        [disabled]="disabled()"
        (click)="geolocateControl.control.trigger()"
      >
        <ng-icon name="lucideLocateFixed" />
      </button>
    </mgl-control>
  `,
})
export class ElbGeolocateControl {
  private _geolocateControl =
    viewChild.required<ControlComponent<MaplibreGeolocateControl>>('geolocateControl');

  public readonly position = input<ControlPosition>();
  public readonly disabled = input<boolean, BooleanInput>(false, {
    transform: booleanAttribute,
  });

  geolocate = output<Position>();

  trigger() {
    const control = this._geolocateControl().control as MaplibreGeolocateControl;
    control.trigger();
  }
}
