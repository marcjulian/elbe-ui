import { Component } from '@angular/core';
import { ElbHighlightImports } from '@elbe/ui/highlight';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { simpleGithub } from '@ng-icons/simple-icons';
import { HlmButtonImports } from '@spartan-ng/helm/button';
import { config } from '../../../config';
import { H2 } from '../../../ui/heading';
import { Preview } from '../../../ui/preview';
import { ClusterPreview } from './cluster.preview';
import { SourcePreview } from './source.preview';

@Component({
  selector: 'elb-source-page',
  imports: [
    NgIcon,
    H2,
    HlmButtonImports,
    ElbHighlightImports,
    Preview,
    SourcePreview,
    ClusterPreview,
  ],
  providers: [provideIcons({ simpleGithub })],
  template: `
    <div class="flex flex-col gap-2">
      <div class="flex justify-between">
        <h1 class="text-3xl font-semibold">Source</h1>
        <a
          hlmBtn
          variant="outline"
          size="sm"
          href="${config.github}/tree/main/libs/map/source/src/lib"
          target="_blank"
          rel="noopener noreferrer"
        >
          Open in
          <ng-icon name="simpleGithub" />
        </a>
      </div>
      <p class="text-muted-foreground">Add GeoJSON data to the map with a declarative directive.</p>
    </div>

    <div elbPreview>
      <elb-source-preview />
    </div>

    <elb-h2 id="usage"> Usage </elb-h2>
    <div class="typeset mt-2">
      <p>
        <code>MglGeoJSONSource</code> is a directive (<code>[mglGeoJSONSource]</code> or
        <code>mgl-geojson-source</code>). Bind the data directly or leave it out while an async
        value is pending.
      </p>
      <elb-code-block [code]="usageSnippet" lang="html" />
      <p>
        A source only registers data. To render it, add an <code>mgl-layer</code> that references
        the source <code>id</code>:
      </p>
      <elb-code-block [code]="layerSnippet" lang="ts" />
    </div>

    <elb-h2 id="features"> Features </elb-h2>
    <div class="typeset mt-2">
      <p>
        Instead of a <code>FeatureCollection</code>, you can declare features as children. They are
        merged into the source and update it as they are added or removed.
      </p>
      <elb-code-block [code]="featuresSnippet" lang="html" />
    </div>

    <elb-h2 id="popups"> Popups </elb-h2>
    <div class="typeset mt-2">
      <p>
        Layer events include the clicked feature. Store it on a signal and render an
        <code>mgl-popup</code> with <code>[feature]</code>. The feature input anchors the popup at
        the feature's geometry, and <code>MglPopup</code> recreates the underlying popup when the
        feature reference changes, so it also survives MapLibre closing the previous popup on click.
      </p>
      <elb-code-block [code]="popupSnippet" lang="html" />
      <elb-code-block [code]="popupHandlerSnippet" lang="ts" />
      <p>
        The cast is valid for point/circle layers, where the rendered feature geometry is a
        <code>Point</code>. For line or fill layers, prefer anchoring with <code>lngLat</code>.
      </p>
    </div>

    <elb-h2 id="clustering"> Clustering </elb-h2>
    <div class="typeset mt-2">
      <p>
        Point sources can be clustered in MapLibre. The clustering options are inputs on the source,
        so they can be bound like any other value.
      </p>
      <elb-code-block [code]="clusteringSnippet" lang="html" wrap />
      <p>
        Cluster-aware helpers such as <code>getClusterExpansionZoom</code>,
        <code>getClusterChildren</code> and <code>getClusterLeaves</code> are available on the
        directive.
      </p>
      <p>
        To render clustered points as HTML markers instead of WebGL symbols, add
        <code>mgl-marker-cluster</code> from <code>&#64;elbe-ui/map/marker-cluster</code>, provide a
        template for points and clusters, and import the two template directives
        <code>MglPointTemplate</code> and <code>MglClusterPointTemplate</code> in the host
        component's <code>imports</code>.
      </p>
      <elb-code-block [code]="markerClusterSnippet" lang="html" wrap />
      <div elbPreview>
        <elb-cluster-preview />
      </div>
    </div>

    <elb-h2 id="attribute-form"> Attribute form </elb-h2>
    <div class="typeset mt-2">
      <p>
        The attribute selector is useful with <code>ng-container</code>, which does not render a DOM
        element:
      </p>
      <elb-code-block [code]="attributeSnippet" lang="html" />
    </div>
  `,
})
export class SourcePage {
  usageSnippet = `<mgl-map [mapStyle]="style" [center]="center" [zoom]="10">
  <mgl-geojson-source id="places" [data]="places" />
</mgl-map>`;

  layerSnippet = `<mgl-layer
  id="places"
  type="circle"
  source="places"
  [paint]="{
    'circle-radius': 8,
    'circle-color': '#009689'
  }"
/>`;

  featuresSnippet = `<mgl-geojson-source id="places">
  @for (place of places; track place.id) {
    <mgl-feature
      [id]="place.id"
      [geometry]="place.geometry"
      [properties]="place.properties"
    />
  }
</mgl-geojson-source>`;

  clusteringSnippet = `<mgl-geojson-source
  id="places"
  [data]="places"
  [cluster]="true"
  [clusterRadius]="50"
  [clusterMaxZoom]="14"
/>`;

  markerClusterSnippet = `<mgl-marker-cluster source="places">
  <ng-template mglPoint>
    <span class="bg-primary block size-2.5 rounded-full border border-white"></span>
  </ng-template>

  <ng-template mglClusterPoint let-feature>
    <span class="bg-primary text-primary-foreground flex size-9 items-center justify-center rounded-full border-2 border-white text-xs font-semibold">
      {{ feature.properties?.['point_count'] }}
    </span>
  </ng-template>
</mgl-marker-cluster>`;

  popupSnippet = `<mgl-layer
  id="places"
  type="circle"
  source="places"
  (layerClick)="showPopup($event)"
/>

@if (selected(); as place) {
  <mgl-popup [feature]="place" class="flex flex-col gap-1 p-4">
    <p class="text-sm font-medium">{{ place.properties?.['name'] }}</p>
    <p class="text-muted-foreground text-xs">GeoJSON feature</p>
  </mgl-popup>
}`;

  popupHandlerSnippet = `selected = signal<GeoJSON.Feature<GeoJSON.Point> | null>(null);

showPopup(event: MapLayerMouseEvent) {
  this.selected.set(event.features![0] as GeoJSON.Feature<GeoJSON.Point>);
}`;

  attributeSnippet = `<ng-container mglGeoJSONSource id="places" [data]="places" />`;
}
