import { Directive, OnChanges, SimpleChanges, inject, input } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import type { VectorSourceSpecification, VectorTileSource } from 'maplibre-gl';
import { tap } from 'rxjs';
import { MglSource } from './mgl-source';

/**
 * `mgl-vector-source` - a vector source directive
 * @see [vector](https://maplibre.org/maplibre-style-spec/sources/#vector)
 *
 * @category Directives
 */
@Directive({
  selector: '[mglVectorSource], mgl-vector-source',
  hostDirectives: [{ directive: MglSource, inputs: ['id'] }],
})
export class MglVectorSource implements OnChanges {
  /** Init injections */
  private readonly sourceDirective = inject(MglSource);

  /** Dynamic inputs */
  readonly url = input<VectorSourceSpecification['url']>();
  readonly tiles = input<VectorSourceSpecification['tiles']>();
  readonly bounds = input<VectorSourceSpecification['bounds']>();
  readonly scheme = input<VectorSourceSpecification['scheme']>();
  readonly minzoom = input<VectorSourceSpecification['minzoom']>();
  readonly maxzoom = input<VectorSourceSpecification['maxzoom']>();
  readonly attribution = input<VectorSourceSpecification['attribution']>();
  readonly promoteId = input<VectorSourceSpecification['promoteId']>();

  constructor() {
    this.sourceDirective.loadSource$
      .pipe(
        tap(() => this.sourceDirective.addSource(this.getVectorSourceSpecification())),
        takeUntilDestroyed(),
      )
      .subscribe();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (!this.sourceDirective.sourceId()) {
      return;
    }

    if (
      (changes['bounds'] && !changes['bounds'].isFirstChange()) ||
      (changes['scheme'] && !changes['scheme'].isFirstChange()) ||
      (changes['minzoom'] && !changes['minzoom'].isFirstChange()) ||
      (changes['maxzoom'] && !changes['maxzoom'].isFirstChange()) ||
      (changes['attribution'] && !changes['attribution'].isFirstChange()) ||
      (changes['promoteId'] && !changes['promoteId'].isFirstChange())
    ) {
      this.sourceDirective.refresh();
    } else if (
      (changes['url'] && !changes['url'].isFirstChange()) ||
      (changes['tiles'] && !changes['tiles'].isFirstChange())
    ) {
      const source = this.sourceDirective.getSource<VectorTileSource>();
      if (source === undefined) {
        return;
      }
      const url = this.url();
      if (changes['url'] && url) {
        source.setUrl(url);
      }

      const tiles = this.tiles();
      if (changes['tiles'] && tiles) {
        source.setTiles(tiles);
      }
    }
  }

  getVectorSourceSpecification(): VectorSourceSpecification {
    return {
      type: 'vector',
      url: this.url(),
      tiles: this.tiles(),
      bounds: this.bounds(),
      scheme: this.scheme(),
      minzoom: this.minzoom(),
      maxzoom: this.maxzoom(),
      attribution: this.attribution(),
      promoteId: this.promoteId(),
    };
  }
}
