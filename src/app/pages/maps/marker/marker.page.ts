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
      <p class="text-muted-foreground">Anchor HTML content to a position on the map.</p>
    </div>

    <div elbPreview>
      <elb-marker-preview />
    </div>

    <elb-h2 id="usage"> Usage </elb-h2>
    <div class="typeset mt-2">
      <p>
        <code>MglMarker</code> is a component (<code>mgl-marker</code>) that renders a dedicated
        marker element for MapLibre. Style it with the <code>className</code> and
        <code>contentStyle</code> inputs.
      </p>
      <elb-code-block [code]="usageSnippet" lang="html" />
      <p>
        Give it a template reference to anchor a popup to it, or to call
        <code>togglePopup()</code>.
      </p>
      <elb-code-block [code]="markerRefSnippet" lang="html" />
    </div>

    <elb-h2 id="default-marker"> Default marker </elb-h2>
    <div class="typeset mt-2">
      <p>
        When no content is projected, MapLibre's default marker is used. Add any content (and style
        the marker element with <code>className</code> or <code>contentStyle</code>) to render your
        own marker.
      </p>
    </div>

    <elb-h2 id="stacking"> Stacking </elb-h2>
    <div class="typeset mt-2">
      <p>
        MapLibre appends markers to the canvas container in DOM order and sets no
        <code>z-index</code>, so the last marker renders on top by default. Control the stacking
        with a <code>z-index</code> on the marker element.
      </p>
    </div>

    <elb-h2 id="z-index"> z-index </elb-h2>
    <div class="typeset mt-2">
      <p>
        A marker's stacking can be controlled through <code>className</code> (e.g. the Tailwind
        <code>z-10</code> utility) or <code>contentStyle</code> directly:
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
        <code>provideMglMarkerConfig</code> sets defaults (offset, anchor, color, draggable,
        className, contentStyle, …) for every <code>mgl-marker</code> within its injector scope.
        Per-marker inputs still win.
      </p>
      <elb-code-block [code]="configSnippet" lang="ts" />
    </div>
  `,
})
export class MarkerPage {
  usageSnippet = `<mgl-map [mapStyle]="style" [center]="center" [zoom]="12">
  <mgl-marker
    [lngLat]="center"
    className="rounded-full bg-primary px-2 py-1 text-xs"
  >
    Hamburg
  </mgl-marker>
</mgl-map>`;

  markerRefSnippet = `<mgl-marker [lngLat]="center" #marker>Hamburg</mgl-marker>
<mgl-popup [marker]="marker">Hello from Hamburg</mgl-popup>`;

  zIndexSnippet = `<!-- Tailwind utility -->
<mgl-marker [lngLat]="[lng, lat]" className="z-10">…</mgl-marker>

<!-- or bind the style -->
<mgl-marker [lngLat]="[lng, lat]" [contentStyle]="{ zIndex: level }">…</mgl-marker>`;

  isolationSnippet = `/* styles.css */
.maplibregl-canvas-container {
  isolation: isolate;
}`;

  configSnippet = `// app.config.ts or a component's providers
providers: [
  provideMglMarkerConfig({
    offset: [0, -14],
    className: 'rounded-full bg-primary px-2 py-1 text-xs',
    contentStyle: { zIndex: 10 },
  }),
];
`;
}
