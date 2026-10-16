import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ElbHighlightImports } from '@elbe/ui/highlight';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { simpleGithub } from '@ng-icons/simple-icons';
import { HlmButtonImports } from '@spartan-ng/helm/button';
import { config } from '../../../config';
import { H2, H3 } from '../../../ui/heading';
import { Preview } from '../../../ui/preview';
import { mapStyles } from './map-controls.styles';
import { MapControlsPreview } from './map-controls.preview';

@Component({
  selector: 'elb-map-controls-page',
  imports: [
    NgIcon,
    RouterLink,
    H2,
    H3,
    HlmButtonImports,
    ElbHighlightImports,
    Preview,
    MapControlsPreview,
  ],
  providers: [provideIcons({ simpleGithub })],
  template: `
    <div class="flex flex-col gap-2">
      <div class="flex justify-between">
        <h1 class="text-3xl font-semibold">Map Controls</h1>
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
        A set of spartan/ui styled controls for
        <a routerLink="/maps"><code>&#64;elbe-ui/map</code></a
        >.
      </p>
    </div>

    <div elbPreview>
      <elb-map-controls-preview />
    </div>

    <elb-h2 id="installation"> Installation </elb-h2>
    <div class="typeset mt-2">
      <p>Install <code>npm install &#64;elbe-ui/map maplibre-gl</code> and add the MapLibre styles:</p>
      <elb-code-block [code]="mapStyles" lang="css" />
      <p>
        <code>&lt;elb-geolocate-control /&gt;</code> reuses the native MapLibre geolocate control for
        its functionality, so hide the original one via CSS:
      </p>
      <elb-code-block [code]="geolocateStyles" lang="css" />
    </div>

    <elb-h2 id="usage"> Usage </elb-h2>
    <div class="typeset mt-2">
      <p>Place the controls inside a <code>&lt;mgl-map&gt;</code>:</p>
      <elb-code-block [code]="usageSnippet" lang="html" />
    </div>

    <elb-h2 id="examples"> Examples </elb-h2>

    <div class="flex items-baseline justify-between gap-6">
      <elb-h3 id="map-control"> Map Control </elb-h3>
      <a
        hlmBtn
        variant="outline"
        size="sm"
        href="${config.github}/tree/main/src/app/pages/components/map-controls/map-controls.preview.ts"
        target="_blank"
        rel="noopener noreferrer"
      >
        Open in
        <ng-icon name="simpleGithub" />
      </a>
    </div>
    <div elbPreview>
      <elb-map-controls-preview />
    </div>
  `,
})
export class MapControlsPage {
  mapStyles = mapStyles;

  geolocateStyles = `/*  styles.css */
@layer base {
  .maplibregl-ctrl-group {
    &:has(*:is(.maplibregl-ctrl-geolocate)) {
      display: none;
    }
  }
}`;

  usageSnippet = `<mgl-map class="size-full" [mapStyle]="style" [center]="[9.99, 53.55]" [zoom]="8">
  <elb-navigation-control />
  <elb-geolocate-control />
  <elb-fullscreen-control />
  <elb-globe-control />
</mgl-map>`;
}
