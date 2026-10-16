import { Component } from '@angular/core';
import { ElbHighlightImports } from '@elbe/ui/highlight';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { simpleGithub } from '@ng-icons/simple-icons';
import { HlmButtonImports } from '@spartan-ng/helm/button';
import { config } from '../../../config';
import { H2 } from '../../../ui/heading';
import { Preview } from '../../../ui/preview';
import { MarkerPreview } from './marker.preview';

@Component({
  selector: 'elb-marker-page',
  imports: [NgIcon, H2, HlmButtonImports, ElbHighlightImports, Preview, MarkerPreview],
  providers: [provideIcons({ simpleGithub })],
  template: `
    <div class="flex flex-col gap-2">
      <div class="flex justify-between">
        <h1 class="text-3xl font-semibold">Marker</h1>
        <a
          hlmBtn
          variant="outline"
          size="sm"
          href="${config.github}/tree/main/libs/map/marker/src/lib"
          target="_blank"
          rel="noopener noreferrer"
        >
          Open in
          <ng-icon name="simpleGithub" />
        </a>
      </div>
      <p class="text-muted-foreground">
        Anchor HTML content to a position on the map with
        <code>&#64;elbe-ui/map/marker</code>.
      </p>
    </div>

    <div elbPreview>
      <elb-marker-preview />
    </div>

    <elb-h2 id="usage"> Usage </elb-h2>
    <div class="typeset mt-2">
      <p>
        <code>MglMarker</code> is a directive (<code>[mglMarker]</code> or <code>mgl-marker</code>)
        that uses its <strong>host element</strong> as the marker element. Style and annotate the
        host directly.
      </p>
      <elb-code-block [code]="usageSnippet" lang="html" />
      <p>
        Give it an <code>exportAs="mglMarker"</code> reference to anchor a popup to it, or to call
        <code>togglePopup()</code>.
      </p>
      <elb-code-block [code]="exportAsSnippet" lang="html" />
    </div>

    <elb-h2 id="default-marker"> Default marker </elb-h2>
    <div class="typeset mt-2">
      <p>
        When the host has no children, MapLibre's default marker is used. Add any content (or style
        the host) to render your own marker.
      </p>
    </div>

    <elb-h2 id="stacking"> Stacking </elb-h2>
    <div class="typeset mt-2">
      <p>
        MapLibre appends markers to the canvas container in DOM order and sets no
        <code>z-index</code>, so the last marker renders on top by default. Control the stacking with
        a <code>z-index</code> on the host.
      </p>
    </div>

    <elb-h2 id="z-index"> z-index </elb-h2>
    <div class="typeset mt-2">
      <p>
        A marker's stacking can be controlled through the host's <code>class</code> (e.g. the
        Tailwind <code>z-10</code> utility) or its <code>style</code> directly:
      </p>
      <elb-code-block [code]="zIndexSnippet" lang="html" />
      <p>
        Markers share the canvas container with the popup and control layers. Give the container its
        own stacking context so a high marker z-index can't leak above the popup or controls layer:
      </p>
      <elb-code-block [code]="isolationSnippet" lang="css" />
    </div>

    <elb-h2 id="configuration"> Configuration </elb-h2>
    <div class="typeset mt-2">
      <p>
        <code>provideMglMarkerConfig</code> sets defaults (offset, anchor, color, draggable, …) for
        every <code>mgl-marker</code> within its injector scope. Per-marker inputs still win.
      </p>
      <elb-code-block [code]="configSnippet" lang="ts" />
    </div>
  `,
})
export class MarkerPage {
  usageSnippet = `<mgl-map [mapStyle]="style" [center]="center" [zoom]="12">
  <mgl-marker [lngLat]="center" class="rounded-full bg-primary px-2 py-1 text-xs">
    Hamburg
  </mgl-marker>
</mgl-map>`;

  exportAsSnippet = `<mgl-marker [lngLat]="center" #marker="mglMarker">Hamburg</mgl-marker>
<mgl-popup [marker]="marker">Hello from Hamburg</mgl-popup>`;

  zIndexSnippet = `<!-- Tailwind utility -->
<mgl-marker [lngLat]="[lng, lat]" class="z-10">…</mgl-marker>

<!-- or bind the style -->
<mgl-marker [lngLat]="[lng, lat]" [style.zIndex]="level">…</mgl-marker>`;

  isolationSnippet = `/* styles.css */
.maplibregl-canvas-container {
  isolation: isolate;
}`;

  configSnippet = `import { provideMglMarkerConfig } from '@elbe-ui/map/marker';

// app.config.ts or a component's providers
providers: [provideMglMarkerConfig({ offset: [0, -14] })];
`;
}
