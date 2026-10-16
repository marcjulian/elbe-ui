import {
  afterNextRender,
  DestroyRef,
  Directive,
  ElementRef,
  inject,
  input,
  OnChanges,
  OnDestroy,
  OnInit,
  output,
  SimpleChanges,
} from '@angular/core';
import type { Popup, PopupOptions } from 'maplibre-gl';
import { MglMapService } from '@elbe-ui/map';
import type { LngLatLikeOrPosition } from '@elbe-ui/map';
import type { MglMarker } from '@elbe-ui/map/marker';
import { tap } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { injectMglPopupConfig } from './mgl-popup.config';

/**
 * `mgl-popup` / `[mglPopup]` - a popup directive.
 *
 * The host element is used as the popup content.
 *
 * @see [Popup](https://maplibre.org/maplibre-gl-js/docs/API/classes/Popup/)
 *
 * @category Directives
 *
 * @example
 * ```html
 * <mgl-map [mapStyle]="style">
 *   <mgl-popup [lngLat]="[-96, 37.8]" [closeOnClick]="false">Hello world !</mgl-popup>
 *
 *   <mgl-marker #myMarker [lngLat]="[-96, 37.8]">…</mgl-marker>
 *   <mgl-popup [marker]="myMarker">Hello from marker !</mgl-popup>
 * </mgl-map>
 * ```
 */
@Directive({
  selector: '[mglPopup], mgl-popup',
  exportAs: 'mglPopup',
  host: {
    'data-slot': 'popup',
  },
})
export class MglPopup implements OnChanges, OnInit, OnDestroy {
  /** Init injection */
  private readonly destroyRef = inject(DestroyRef);
  private readonly mapService = inject(MglMapService);
  private readonly elementRef = inject<ElementRef<HTMLElement>>(ElementRef);
  private readonly config = injectMglPopupConfig();

  /** Init input */
  readonly closeButton = input<PopupOptions['closeButton']>(
    this.config.closeButton,
  );

  /** Init input */
  readonly closeOnClick = input<PopupOptions['closeOnClick']>(
    this.config.closeOnClick,
  );

  /** Init input */
  readonly closeOnMove = input<PopupOptions['closeOnMove']>(
    this.config.closeOnMove,
  );

  /** Init input */
  readonly focusAfterOpen = input<PopupOptions['focusAfterOpen']>(
    this.config.focusAfterOpen,
  );

  /** Init input */
  readonly anchor = input<PopupOptions['anchor']>(this.config.anchor);

  /** Init input */
  readonly locationOccludedOpacity = input<
    PopupOptions['locationOccludedOpacity']
  >(this.config.locationOccludedOpacity);

  /**
   * Dynamic input [ngx]
   * Mutually exclusive with `lngLat`
   */
  readonly feature = input<GeoJSON.Feature<GeoJSON.Point>>();

  /** Dynamic input */
  readonly lngLat = input<LngLatLikeOrPosition>();

  /**
   * Dynamic input [ngx]
   * The targeted marker
   */
  readonly marker = input<MglMarker>();

  /** Dynamic input */
  readonly offset = input<PopupOptions['offset']>(this.config.offset);

  /** Dynamic input */
  readonly maxWidth = input<PopupOptions['maxWidth']>(this.config.maxWidth);

  /** Dynamic input */
  readonly subpixelPositioning = input<PopupOptions['subpixelPositioning']>(
    this.config.subpixelPositioning,
  );

  /** Dynamic input */
  readonly padding = input<PopupOptions['padding']>(this.config.padding);

  readonly popupClose = output<void>();
  readonly popupOpen = output<void>();

  private popupInstance: Popup | null = null;

  constructor() {
    afterNextRender(() => {
      this.popupInstance = this.createPopup();
      this.addPopup(this.popupInstance)
        .pipe(takeUntilDestroyed(this.destroyRef))
        .subscribe();
    });
  }

  ngOnInit() {
    if (
      (this.lngLat() && this.marker()) ||
      (this.feature() && this.lngLat()) ||
      (this.feature() && this.marker())
    ) {
      throw new Error('marker, lngLat, feature input are mutually exclusive');
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['feature'] && !changes['feature'].isFirstChange()) {
      const newlngLat = this.getLngLat(this.lngLat(), this.feature());
      this.mapService.removePopupFromMap(this.popupInstance!);
      const popupInstanceTmp = this.createPopup();
      this.mapService.addPopupToMap(popupInstanceTmp, newlngLat);
      this.popupInstance = popupInstanceTmp;
    }

    if (changes['lngLat'] && !changes['lngLat'].isFirstChange()) {
      this.popupInstance!.setLngLat(changes['lngLat'].currentValue);
    }

    if (changes['marker'] && !changes['marker'].isFirstChange()) {
      const previousMarker: MglMarker = changes['marker'].previousValue;
      const previousMarkerInstance = previousMarker.markerInstance();

      if (previousMarkerInstance) {
        this.mapService.removePopupFromMarker(previousMarkerInstance);
      }

      const markerInstance = this.marker()?.markerInstance();
      if (markerInstance && this.popupInstance) {
        this.mapService.addPopupToMarker(markerInstance, this.popupInstance);
      }
    }
    if (
      changes['offset'] &&
      !changes['offset'].isFirstChange() &&
      this.popupInstance
    ) {
      this.popupInstance.setOffset(changes['offset'].currentValue);
    }

    if (
      changes['maxWidth'] &&
      !changes['maxWidth'].isFirstChange() &&
      this.popupInstance
    ) {
      this.popupInstance.setMaxWidth(changes['maxWidth'].currentValue);
    }

    if (
      changes['subpixelPositioning'] &&
      !changes['subpixelPositioning'].isFirstChange() &&
      this.popupInstance
    ) {
      this.popupInstance.setSubpixelPositioning(
        changes['subpixelPositioning'].currentValue,
      );
    }

    if (
      changes['padding'] &&
      !changes['padding'].isFirstChange() &&
      this.popupInstance
    ) {
      this.popupInstance.setPadding(changes['padding'].currentValue);
    }
  }

  ngOnDestroy(): void {
    this.removePopupFromMarker();
  }

  private createPopup() {
    return this.mapService.createPopup(
      {
        popupOptions: {
          closeButton: this.closeButton(),
          closeOnClick: this.closeOnClick(),
          closeOnMove: this.closeOnMove(),
          focusAfterOpen: this.focusAfterOpen(),
          anchor: this.anchor(),
          offset: this.offset(),
          maxWidth: this.maxWidth(),
          subpixelPositioning: this.subpixelPositioning(),
          locationOccludedOpacity: this.locationOccludedOpacity(),
          padding: this.padding(),
        },
        popupEvents: {
          popupOpen: this.popupOpen,
          popupClose: this.popupClose,
        },
      },
      this.elementRef.nativeElement,
    );
  }

  private addPopup(popup: Popup) {
    return this.mapService.mapCreated$.pipe(
      tap(() => {
        const lngLat = this.lngLat();
        const feature = this.feature();
        const markerInstance = this.marker()?.markerInstance();
        if (lngLat || feature) {
          this.mapService.addPopupToMap(popup, this.getLngLat(lngLat, feature));
        } else if (markerInstance) {
          this.mapService.addPopupToMarker(markerInstance, popup);
        } else {
          throw new Error(
            'mgl-popup need either lngLat/marker/feature to be set',
          );
        }
      }),
    );
  }

  removePopupFromMarker() {
    if (this.popupInstance) {
      const markerInstance = this.marker()?.markerInstance();
      if (this.lngLat() || this.feature()) {
        this.mapService.removePopupFromMap(this.popupInstance);
      } else if (markerInstance) {
        this.mapService.removePopupFromMarker(markerInstance);
      } else {
        this.mapService.removePopupFromMap(this.popupInstance);
      }
    }
    this.popupInstance = null;
  }

  getLngLat(
    lngLat: LngLatLikeOrPosition | undefined,
    feature: GeoJSON.Feature<GeoJSON.Point> | undefined,
  ): LngLatLikeOrPosition {
    if (lngLat) {
      return lngLat;
    } else if (feature) {
      return feature.geometry.coordinates;
    }
    throw new Error('lngLat or feature value is required');
  }
}
