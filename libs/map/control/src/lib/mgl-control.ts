import {
  afterNextRender,
  Component,
  ElementRef,
  inject,
  input,
  OnDestroy,
  viewChild,
} from '@angular/core';
import { MglMapService } from '@elbe-ui/map';
import type { ControlPosition, IControl } from 'maplibre-gl';

/**
 * The default `IControl` used by {@link MglControl} to render projected content
 * into one of the map's control corners.
 */
export class MglCustomControl implements IControl {
  constructor(private readonly container: HTMLElement) {}

  onAdd(): HTMLElement {
    return this.container;
  }

  onRemove(): void {
    this.container.parentNode?.removeChild(this.container);
  }

  getDefaultPosition(): ControlPosition {
    return 'top-right';
  }
}

/**
 * `mgl-control` - a custom control component
 * @see [Controls](https://maplibre.org/maplibre-gl-js/docs/API/interfaces/IControl/)
 *
 * @category Components
 *
 * @example
 * ```html
 * <mgl-map ...>
 *   <mgl-control> Hello </mgl-control>
 *   <mgl-control mglNavigation></mgl-control>
 *   <mgl-control mglScale unit="imperial" position="top-right"></mgl-control>
 * </mgl-map>
 * ```
 */
@Component({
  selector: 'mgl-control',
  template: `
    <div class="maplibregl-ctrl" #content>
      <ng-content></ng-content>
    </div>
  `,
})
export class MglControl<T extends IControl> implements OnDestroy {
  private readonly mapService = inject(MglMapService);

  readonly position = input<ControlPosition>();

  /** @hidden */
  readonly content = viewChild.required<ElementRef<HTMLDivElement>>('content');

  control?: T | MglCustomControl;

  constructor() {
    afterNextRender(() => {
      if (this.content().nativeElement.childNodes.length) {
        this.control = new MglCustomControl(this.content().nativeElement);
        this.mapService.mapCreated$.subscribe(() => {
          this.mapService.addControl(this.control!, this.position());
        });
      }
    });
  }

  ngOnDestroy(): void {
    if (this.control && this.mapService.mapInstance?.hasControl(this.control)) {
      this.mapService.removeControl(this.control);
    }
  }
}
