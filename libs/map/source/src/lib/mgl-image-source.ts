import {
  DestroyRef,
  Directive,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
  inject,
  input,
  signal,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MglMapService } from '@elbe-ui/map';
import type { ImageSource, ImageSourceSpecification } from 'maplibre-gl';

/**
 * `mgl-image-source` - an image source directive
 * @see [image](https://maplibre.org/maplibre-style-spec/sources/#image)
 *
 * @category Directives
 */
@Directive({
  selector: '[mglImageSource], mgl-image-source',
})
export class MglImageSource implements OnInit, OnDestroy, OnChanges {
  /** Init injection */
  private readonly destroyRef = inject(DestroyRef);
  private readonly mapService = inject(MglMapService);

  /** Init inputs */
  readonly id = input.required<string>();

  /** Dynamic inputs */
  readonly url = input.required<ImageSourceSpecification['url']>();
  readonly coordinates = input.required<ImageSourceSpecification['coordinates']>();

  readonly type: ImageSourceSpecification['type'] = 'image';

  private readonly sourceId = signal<string | null>(null);

  ngOnInit() {
    this.mapService.mapLoaded$
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => this.addSource());
  }

  ngOnChanges(changes: SimpleChanges) {
    const sourceId = this.sourceId();
    if (sourceId === null) {
      return;
    }
    const source = this.mapService.getSource<ImageSource>(sourceId);
    if (source === undefined) {
      return;
    }
    source.updateImage({
      url: changes['url'] === undefined ? (undefined as any) : this.url(),
      coordinates: changes['coordinates'] === undefined ? undefined : this.coordinates(),
    });
  }

  ngOnDestroy(): void {
    const sourceId = this.sourceId();
    if (sourceId !== null) {
      this.mapService.removeSource(sourceId);
      this.sourceId.set(null);
    }
  }

  private addSource() {
    const imageSource: ImageSourceSpecification = {
      type: 'image',
      url: this.url(),
      coordinates: this.coordinates(),
    };
    this.mapService.addSource(this.id(), imageSource);
    this.sourceId.set(this.id());
  }
}
