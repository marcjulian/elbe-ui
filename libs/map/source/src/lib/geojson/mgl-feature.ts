import { Directive, forwardRef, inject, input, model, OnDestroy, OnInit } from '@angular/core';
import { MglGeoJSONSource } from './mgl-geojson-source';

/**
 * `mgl-feature` - a feature directive
 * [ngx] inside {@link MglGeoJSONSource} only
 *
 * @category Directives
 */
@Directive({
  selector: '[mglFeature], mgl-feature',
})
export class MglFeature implements OnInit, OnDestroy {
  /** Init injection */
  private readonly geoJSONSource = inject<MglGeoJSONSource>(forwardRef(() => MglGeoJSONSource));
  /** Init input */
  readonly id = model<number>();
  /** Init input */
  readonly geometry = input.required<GeoJSON.GeometryObject>();

  /** Init input */
  readonly properties = input<GeoJSON.Feature<GeoJSON.GeometryObject>['properties']>();

  private feature!: GeoJSON.Feature<GeoJSON.GeometryObject>;

  ngOnInit() {
    const id = this.id();
    if (!id) {
      this.id.set(this.geoJSONSource._getNewFeatureId());
    }
    const properties = this.properties();
    this.feature = {
      type: 'Feature',
      geometry: this.geometry(),
      properties: properties ?? {},
    };
    this.feature.id = this.id();
    this.geoJSONSource._addFeature(this.feature);
  }

  ngOnDestroy(): void {
    this.geoJSONSource._removeFeature(this.feature);
  }

  updateCoordinates(coordinates: number[]) {
    (<GeoJSON.Point>this.feature.geometry).coordinates = coordinates;
    this.geoJSONSource.updateFeatureData();
  }
}
