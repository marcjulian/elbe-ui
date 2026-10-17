import { afterNextRender, Directive, ElementRef, inject, input, OnDestroy } from '@angular/core';
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
 * `mgl-control` / `[mglControl]` - a custom control directive.
 *
 * The host element is used as the control element, so any projected content
 * becomes the control.
 *
 * @see [Controls](https://maplibre.org/maplibre-gl-js/docs/API/interfaces/IControl/)
 *
 * @category Directives
 *
 * @example
 * ```html
 * <mgl-map ...>
 *   <mgl-control position="bottom-left"> Hello </mgl-control>
 *   <mgl-control mglNavigation></mgl-control>
 *   <mgl-control mglScale unit="imperial" position="top-right"></mgl-control>
 * </mgl-map>
 * ```
 */
@Directive({
  selector: '[mglControl],mgl-control',
  exportAs: 'mglControl',
  host: {
    'data-slot': 'map-control',
    class: 'maplibregl-ctrl',
  },
})
export class MglControl<T extends IControl> implements OnDestroy {
  private readonly mapService = inject(MglMapService);
  private readonly elementRef = inject<ElementRef<HTMLElement>>(ElementRef);

  readonly position = input<ControlPosition>();

  control?: T | MglCustomControl;

  constructor() {
    afterNextRender(() => {
      const element = this.elementRef.nativeElement;
      if (element.childNodes.length) {
        this.control = new MglCustomControl(element);
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
