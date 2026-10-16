import type { BooleanInput } from '@angular/cdk/coercion';
import {
  afterNextRender,
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  inject,
  input,
  OnDestroy,
  output,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MglControl } from '@elbe-ui/map/control';
import { MglMapService } from '@elbe-ui/map';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideLocateFixed } from '@ng-icons/lucide';
import { HlmButton } from '@spartan-ng/helm/button';
import { GeolocateControl } from 'maplibre-gl';
import type { ControlPosition, GeolocatePositionEvent } from 'maplibre-gl';

@Component({
  selector: 'elb-geolocate-control',
  imports: [MglControl, HlmButton, NgIcon],
  providers: [provideIcons({ lucideLocateFixed })],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <mgl-control [position]="position()">
      <button
        hlmBtn
        variant="outline"
        size="icon-sm"
        type="button"
        aria-label="Geolocate"
        class="dark:bg-background dark:hover:bg-background/80"
        [disabled]="disabled()"
        (click)="trigger()"
      >
        <ng-icon name="lucideLocateFixed" />
      </button>
    </mgl-control>
  `,
})
export class ElbGeolocateControl implements OnDestroy {
  private readonly _mapService = inject(MglMapService);
  private readonly _destroyRef = inject(DestroyRef);

  private _control: GeolocateControl | null = null;

  public readonly position = input<ControlPosition>();
  public readonly disabled = input<boolean, BooleanInput>(false, {
    transform: booleanAttribute,
  });

  /** Emits when the browser reports a new position. */
  public readonly geolocate = output<GeolocatePositionEvent>();

  constructor() {
    afterNextRender(() => {
      const control = new GeolocateControl({
        trackUserLocation: true,
        positionOptions: { enableHighAccuracy: true },
      });
      control.on('geolocate', (event) => this.geolocate.emit(event));
      this._control = control;

      this._mapService.mapCreated$
        .pipe(takeUntilDestroyed(this._destroyRef))
        .subscribe(() => this._mapService.addControl(control));
    });
  }

  ngOnDestroy(): void {
    if (this._control && this._mapService.mapInstance?.hasControl(this._control)) {
      this._mapService.removeControl(this._control);
    }
  }

  /** Triggers a one-off geolocation request. */
  public trigger() {
    this._control?.trigger();
  }
}
