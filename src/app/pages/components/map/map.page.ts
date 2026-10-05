import { Component } from '@angular/core';
import { ElbHighlightImports } from '@elbe/ui/highlight';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { simpleGithub } from '@ng-icons/simple-icons';
import { HlmButtonImports } from '@spartan-ng/helm/button';
import { config } from '../../../config';
import { H2, H3 } from '../../../ui/heading';
import { Preview } from '../../../ui/preview';
import { mapStyles } from './map-styles';
import { MapPreview } from './map.preview';

@Component({
  selector: 'elb-map-page',
  imports: [NgIcon, H2, H3, HlmButtonImports, ElbHighlightImports, Preview, MapPreview],
  providers: [provideIcons({ simpleGithub })],
  template: `
    <div class="flex flex-col gap-2">
      <div class="flex justify-between">
        <h1 class="text-3xl font-semibold">Map</h1>
        <a
          hlmBtn
          variant="outline"
          size="sm"
          href="${config.github}/tree/main/libs/elbe/map/src/lib"
          target="_blank"
          rel="noopener noreferrer"
        >
          Open in
          <ng-icon name="simpleGithub" />
        </a>
      </div>
      <p class="text-muted-foreground">
        A set of spartan/ui components for building maps with Maplibre.
      </p>
    </div>

    <div elbPreview>
      <elb-map-preview />
    </div>

    <elb-h2 id="installation"> Installation </elb-h2>
    <div class="typeset mt-2">
      <p>
        The map components are an addition to the
        <a
          href="https://github.com/maplibre/ngx-maplibre-gl"
          target="_blank"
          rel="noopener noreferrer"
          >ngx-maplibre-gl</a
        >
        library.
      </p>

      <p>Install <code>npm install @maplibre/ngx-maplibre-gl maplibre-gl</code>.</p>
      <elb-code-block [code]="mapStyles" lang="css" />
      <p>
        <code>&lt;elb-geolocate-control /&gt;</code> reuses the native MapLibre geolocate control
        for its functionality, so hide the original one via CSS:
      </p>
      <elb-code-block [code]="geolocateStyles" lang="css" />
    </div>

    <elb-h2 id="examples"> Examples </elb-h2>

    <div class="flex items-baseline justify-between gap-6">
      <elb-h3 id="map-control"> Map Control </elb-h3>
      <a
        hlmBtn
        variant="outline"
        size="sm"
        href="${config.github}/tree/main/src/app/pages/components/map/map.preview.ts"
        target="_blank"
        rel="noopener noreferrer"
      >
        Open in
        <ng-icon name="simpleGithub" />
      </a>
    </div>
    <div elbPreview>
      <elb-map-preview />
    </div>
  `,
})
export class MapPage {
  mapStyles = mapStyles;
  geolocateStyles = `/*  styles.css */
@layer base {
  .maplibregl-ctrl-group {
    &:has(*:is(.maplibregl-ctrl-geolocate)) {
      display: none;
    }
  }
}`;
}
