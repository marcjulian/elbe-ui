import { BooleanInput } from '@angular/cdk/coercion';
import {
  afterNextRender,
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
  signal,
} from '@angular/core';
import { ControlComponent, MapService } from '@maplibre/ngx-maplibre-gl';
import { provideIcons } from '@ng-icons/core';
import { lucideMinus, lucidePlus } from '@ng-icons/lucide';
import { HlmButtonImports } from '@spartan-ng/helm/button';
import { HlmButtonGroupImports } from '@spartan-ng/helm/button-group';
import { HlmIconImports } from '@spartan-ng/helm/icon';
import type { ControlPosition } from 'maplibre-gl';

@Component({
  selector: 'elb-navigation-control',
  imports: [ControlComponent, HlmIconImports, HlmButtonImports, HlmButtonGroupImports],
  providers: [provideIcons({ lucidePlus, lucideMinus })],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <mgl-control [position]="position()">
      <hlm-button-group orientation="vertical" aria-label="Media controls" class="h-fit">
        <button
          hlmBtn
          variant="outline"
          size="icon-sm"
          type="button"
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
  private mapService = inject(MapService);

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
      this.updateZoomState();
      this.mapService.mapInstance.on('zoom', () => this.updateZoomState());
    });
  }

  private updateZoomState() {
    const map = this.mapService.mapInstance;
    this._zoom.set(map.getZoom());
    this._maxZoom.set(map.getMaxZoom());
    this._minZoom.set(map.getMinZoom());
  }

  protected _zoomIn() {
    this.mapService.mapInstance.zoomIn();
  }

  protected _zoomOut() {
    this.mapService.mapInstance.zoomOut();
  }
}
