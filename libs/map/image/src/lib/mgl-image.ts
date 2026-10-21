import {
  DestroyRef,
  Directive,
  NgZone,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
  inject,
  input,
  output,
  signal,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MglMapService, type MapImageData, type MapImageOptions } from '@elbe-ui/map';
import { fromEvent } from 'rxjs';
import { filter, startWith, switchMap, tap } from 'rxjs/operators';

/**
 * `mgl-image` / `[mglImage]` - an image directive.
 *
 * Registers an image in the map's style so it can be used by layers, e.g. as a
 * symbol's `icon-image` or a layer's pattern. Provide either `data` (an image
 * that is already available) or `url` (loaded by MapLibre).
 *
 * The image is added again whenever the style is replaced or reloaded.
 *
 * @see [addImage](https://maplibre.org/maplibre-gl-js/docs/API/classes/Map/#addimage)
 *
 * @category Directives
 *
 * @example
 * ```html
 * <mgl-map [mapStyle]="style" [center]="center" [zoom]="10">
 *   <mgl-image id="hamburg-pin" url="/assets/hamburg-pin.png" [options]="{ pixelRatio: 2 }" />
 *
 *   <mgl-layer
 *     id="places"
 *     type="symbol"
 *     source="places"
 *     [layout]="{ 'icon-image': 'hamburg-pin' }"
 *   />
 * </mgl-map>
 * ```
 */
@Directive({
  selector: '[mglImage], mgl-image',
})
export class MglImage implements OnInit, OnChanges, OnDestroy {
  /** Init injection */
  private readonly mapService = inject(MglMapService);
  private readonly destroyRef = inject(DestroyRef);
  private readonly zone = inject(NgZone);

  /** Init input */
  readonly id = input.required<string>();

  /** Dynamic input */
  readonly data = input<MapImageData>();
  /** Dynamic input */
  readonly options = input<MapImageOptions>();
  /** Dynamic input */
  readonly url = input<string>();

  readonly imageError = output<unknown>();
  readonly imageLoaded = output<void>();

  private readonly mapReady = signal(false);
  private readonly isAdding = signal(false);
  /** Tracks the id this directive added, to remove it on destroy or id changes. */
  private readonly addedId = signal<string | null>(null);
  /** Invalidates in-flight `url` loads when the inputs change again. */
  private loadId = 0;

  ngOnInit(): void {
    this.mapService.mapLoaded$
      .pipe(
        tap(() => this.mapReady.set(true)),
        switchMap(() =>
          fromEvent(this.mapService.mapInstance, 'styledata').pipe(
            startWith(undefined),
            filter(() => !this.isAdding() && !this.mapService.mapInstance.hasImage(this.id())),
          ),
        ),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe(() => void this.addImage());
  }

  ngOnChanges(changes: SimpleChanges): void {
    const dataChanged = !!changes['data'] && !changes['data'].isFirstChange();
    const optionsChanged = !!changes['options'] && !changes['options'].isFirstChange();
    const urlChanged = !!changes['url'] && !changes['url'].isFirstChange();
    const idChanged = !!changes['id'] && !changes['id'].isFirstChange();

    if (!dataChanged && !optionsChanged && !urlChanged && !idChanged) {
      return;
    }

    // The initial add uses the latest input values, so there is nothing to do
    // until the map has loaded.
    if (!this.mapReady()) {
      return;
    }

    if (idChanged) {
      const previousId = this.addedId();
      if (previousId) {
        this.mapService.removeImageNow(previousId);
        this.addedId.set(null);
      }
    }

    void this.addImage(true);
  }

  ngOnDestroy(): void {
    this.loadId++;
    const id = this.addedId();
    if (id) {
      // Deferred by the service so it is safe during view teardown.
      this.mapService.removeImage(id);
      this.addedId.set(null);
    }
  }

  private async addImage(force = false): Promise<void> {
    if (!force && this.isAdding()) {
      return;
    }

    const id = this.id();
    const data = this.data();
    const url = this.url();
    const loadId = ++this.loadId;

    if (!data && !url) {
      this.mapService.removeImageNow(id);
      this.addedId.set(null);
      return;
    }

    this.isAdding.set(true);
    try {
      if (data) {
        this.mapService.setImage(id, data, this.options());
      } else {
        const image = await this.mapService.loadImage(url!);
        // A newer input value started loading while this one was in flight.
        if (loadId !== this.loadId) {
          return;
        }
        this.mapService.setImage(id, image.data, this.options());
      }

      if (loadId !== this.loadId) {
        return;
      }

      this.addedId.set(id);
      this.zone.run(() => this.imageLoaded.emit());
    } catch (error) {
      if (loadId !== this.loadId) {
        return;
      }
      this.zone.run(() => this.imageError.emit(error));
    } finally {
      if (loadId === this.loadId) {
        this.isAdding.set(false);
      }
    }
  }
}
