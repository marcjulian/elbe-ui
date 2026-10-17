import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
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
  imports: [NgIcon, RouterLink, H2, H3, HlmButtonImports, ElbHighlightImports, Preview, MapPreview],
  providers: [provideIcons({ simpleGithub })],
  template: `
    <div class="flex flex-col gap-2">
      <div class="flex justify-between">
        <h1 class="text-3xl font-semibold">Map</h1>
        <a
          hlmBtn
          variant="outline"
          size="sm"
          href="${config.github}/tree/main/libs/map/src/lib"
          target="_blank"
          rel="noopener noreferrer"
        >
          Open in
          <ng-icon name="simpleGithub" />
        </a>
      </div>
      <p class="text-muted-foreground">
        A Maplibre map directive and spartan/ui styled controls from
        <code>&#64;elbe-ui/map</code>.
      </p>
    </div>

    <div elbPreview>
      <elb-map-preview />
    </div>

    <elb-h2 id="installation"> Installation </elb-h2>
    <div class="typeset mt-2">
      <p>
        The components are a thin wrapper around
        <a
          href="https://maplibre.org/maplibre-gl-js/docs/"
          target="_blank"
          rel="noopener noreferrer"
          >maplibre-gl</a
        >.
      </p>

      <p>Install <code>npm install &#64;elbe-ui/map maplibre-gl</code>.</p>
      <elb-code-block [code]="mapStyles" lang="css" />
      <p>
        MapLibre GL JS v6 needs a web worker. Copy <code>maplibre-gl-worker.mjs</code> and
        <code>maplibre-gl-shared.mjs</code> from <code>node_modules/maplibre-gl/dist</code> into
        your assets and provide the worker URL:
      </p>
      <elb-code-block [code]="workerSnippet" lang="ts" />
    </div>

    <elb-h2 id="usage"> Usage </elb-h2>
    <div class="typeset mt-2">
      <p>
        <code>MglMap</code> is a directive (<code>[mglMap]</code> or <code>mgl-map</code>) that uses
        its host element as the map container, so the element must be sized.
      </p>
      <elb-code-block [code]="usageSnippet" lang="html" />
      <p>
        Continue with <a routerLink="/maps/marker">Marker</a>,
        <a routerLink="/maps/popup">Popup</a> and <a routerLink="/maps/control">Controls</a>.
      </p>
    </div>

    <elb-h2 id="examples"> Examples </elb-h2>

    <div class="flex items-baseline justify-between gap-6">
      <elb-h3 id="map-control"> Map Control </elb-h3>
      <a
        hlmBtn
        variant="outline"
        size="sm"
        href="${config.github}/tree/main/src/app/pages/maps/map/map.preview.ts"
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

    <p class="mt-4 text-sm">
      Looking for spartan/ui styled controls?
      <a class="underline" routerLink="/components/map-controls">See Map Controls</a>.
    </p>
  `,
})
export class MapPage {
  mapStyles = mapStyles;

  workerSnippet = `// app.config.ts
import { provideMglMaplibreWorker } from '@elbe-ui/map/core';

export const appConfig: ApplicationConfig = {
  providers: [provideMglMaplibreWorker('maplibre-gl-worker.mjs')],
};`;

  usageSnippet = `<mgl-map class="size-full" [mapStyle]="style" [center]="[9.99, 53.55]" [zoom]="8">
  <mgl-control mglNavigation position="top-right"></mgl-control>
</mgl-map>`;
}
