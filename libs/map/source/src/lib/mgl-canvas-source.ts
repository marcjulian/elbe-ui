import { Directive, OnChanges, SimpleChanges, inject, input } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import type { CanvasSource, CanvasSourceSpecification } from 'maplibre-gl';
import { tap } from 'rxjs';
import { MglSource } from './mgl-source';

/**
 * `mgl-canvas-source` - a canvas source directive
 * @see [canvas](https://maplibre.org/maplibre-style-spec/sources/#canvas)
 *
 * @category Directives
 */
@Directive({
  selector: '[mglCanvasSource], mgl-canvas-source',
  hostDirectives: [{ directive: MglSource, inputs: ['id'] }],
})
export class MglCanvasSource implements OnChanges {
  /** Init injections */
  private readonly sourceDirective = inject(MglSource);

  /** Dynamic input */
  readonly coordinates = input.required<CanvasSourceSpecification['coordinates']>();

  /** Dynamic input */
  readonly canvas = input.required<CanvasSourceSpecification['canvas']>();

  /** Dynamic input */
  readonly animate = input<CanvasSourceSpecification['animate']>();

  constructor() {
    this.sourceDirective.loadSource$
      .pipe(
        tap(() => this.sourceDirective.addSource(this.getCanvasSourceSpecification() as any)),
        takeUntilDestroyed(),
      )
      .subscribe();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (!this.sourceDirective.sourceId()) {
      return;
    }
    if (
      (changes['canvas'] && !changes['canvas'].isFirstChange()) ||
      (changes['animate'] && !changes['animate'].isFirstChange())
    ) {
      this.sourceDirective.refresh();
    } else if (changes['coordinates'] && !changes['coordinates'].isFirstChange()) {
      const source = this.sourceDirective.getSource<CanvasSource>();
      if (source === undefined) {
        return;
      }
      source.setCoordinates(changes['coordinates'].currentValue);
    }
  }

  getCanvasSourceSpecification(): CanvasSourceSpecification {
    return {
      type: 'canvas',
      coordinates: this.coordinates(),
      canvas: this.canvas(),
      animate: this.animate(),
    };
  }
}
