import type { BooleanInput } from '@angular/cdk/coercion';
import {
  afterNextRender,
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  computed,
  DestroyRef,
  inject,
  input,
  signal,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MglControl } from '@elbe-ui/map/control';
import { MglMapService } from '@elbe-ui/map';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideMinus, lucidePlus } from '@ng-icons/lucide';
import { HlmButtonImports } from '@spartan-ng/helm/button';
import { HlmButtonGroupImports } from '@spartan-ng/helm/button-group';
import type { ControlPosition } from 'maplibre-gl';

@Component({
  selector: 'elb-navigation-control',
  imports: [MglControl, NgIcon, HlmButtonImports, HlmButtonGroupImports],
  providers: [provideIcons({ lucidePlus, lucideMinus })],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <mgl-control [position]="position()">
      <hlm-button-group orientation="vertical" aria-label="Map zoom controls" class="h-fit">
        <button
          hlmBtn
          variant="outline"
          size="icon-sm"
          type="button"
          aria-label="Zoom in"
          class="dark:bg-background dark:hover:bg-background/80"
          [disabled]="_disabledZoomIn()"
          (click)="_zoomIn()"
        >
          <ng-icon name="lucidePlus" />
        </button>
        <button
          hlmBtn
          variant="outline"
          size="icon-sm"
          type="button"
          aria-label="Zoom out"
          class="dark:bg-background dark:hover:bg-background/80"
          [disabled]="_disabledZoomOut()"
          (click)="_zoomOut()"
        >
          <ng-icon name="lucideMinus" />
        </button>
      </hlm-button-group>
    </mgl-control>
  `,
})
export class ElbNavigationControl {
  private readonly _mapService = inject(MglMapService);
  private readonly _destroyRef = inject(DestroyRef);

  private readonly _zoom = signal(0);
  private readonly _maxZoom = signal(0);
  private readonly _minZoom = signal(0);

  public readonly position = input<ControlPosition>();

  public readonly disabled = input<boolean, BooleanInput>(false, { transform: booleanAttribute });

  protected readonly _disabledZoomIn = computed(
    () => this.disabled() || this._zoom() >= this._maxZoom(),
  );
  protected readonly _disabledZoomOut = computed(
    () => this.disabled() || this._zoom() <= this._minZoom(),
  );

  constructor() {
    afterNextRender(() => {
      this._mapService.mapCreated$
        .pipe(takeUntilDestroyed(this._destroyRef))
        .subscribe(() => {
          const map = this._mapService.mapInstance;
          const updateZoomState = () => {
            this._zoom.set(map.getZoom());
            this._maxZoom.set(map.getMaxZoom());
            this._minZoom.set(map.getMinZoom());
          };

          updateZoomState();
          map.on('zoom', updateZoomState);
          this._destroyRef.onDestroy(() => map.off('zoom', updateZoomState));
        });
    });
  }

  protected _zoomIn() {
    this._mapService.mapInstance?.zoomIn();
  }

  protected _zoomOut() {
    this._mapService.mapInstance?.zoomOut();
  }
}
