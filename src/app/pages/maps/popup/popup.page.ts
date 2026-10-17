import { Component } from '@angular/core';
import { ElbHighlightImports } from '@elbe/ui/highlight';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { simpleGithub } from '@ng-icons/simple-icons';
import { HlmButtonImports } from '@spartan-ng/helm/button';
import { config } from '../../../config';
import { H2 } from '../../../ui/heading';
import { Preview } from '../../../ui/preview';
import { PopupPreview } from './popup.preview';

@Component({
  selector: 'elb-popup-page',
  imports: [NgIcon, H2, HlmButtonImports, ElbHighlightImports, Preview, PopupPreview],
  providers: [provideIcons({ simpleGithub })],
  template: `
    <div class="flex flex-col gap-2">
      <div class="flex justify-between">
        <h1 class="text-3xl font-semibold">Popup</h1>
        <a
          hlmBtn
          variant="outline"
          size="sm"
          href="${config.github}/tree/main/libs/map/popup/src/lib"
          target="_blank"
          rel="noopener noreferrer"
        >
          Open in
          <ng-icon name="simpleGithub" />
        </a>
      </div>
      <p class="text-muted-foreground">
        Show a small overlay anchored to a position, feature or marker on the map.
      </p>
    </div>

    <div elbPreview>
      <elb-popup-preview />
    </div>

    <elb-h2 id="usage"> Usage </elb-h2>
    <div class="typeset mt-2">
      <p>
        <code>MglPopup</code> is a directive (<code>[mglPopup]</code> or <code>mgl-popup</code>)
        that uses its <strong>host element</strong> as the popup content. It must be anchored by
        exactly one of <code>lngLat</code>, <code>feature</code> or <code>marker</code>.
      </p>
      <elb-code-block [code]="usageSnippet" lang="html" />
    </div>

    <elb-h2 id="anchoring"> Anchoring </elb-h2>
    <div class="typeset mt-2">
      <ul class="list-disc">
        <li><code>lngLat</code> — a fixed position on the map.</li>
        <li><code>feature</code> — a GeoJSON point (its coordinates are used).</li>
        <li>
          <code>marker</code> — an <code>MglMarker</code> reference
          (<code>#marker="mglMarker"</code>).
        </li>
      </ul>
      <p>
        Pass <code>[closeButton]="false"</code>, <code>[closeOnClick]="false"</code> or
        <code>[closeOnMove]="false"</code> to change the default close behaviour.
      </p>
    </div>

    <elb-h2 id="styling"> Styling </elb-h2>
    <div class="typeset mt-2">
      <p>
        The popup host is the popup content, so style it directly with
        <code>class</code>/<code>style</code>:
      </p>
      <elb-code-block [code]="stylingHostSnippet" lang="html" />
      <p>
        MapLibre wraps that content in its own <code>.maplibregl-popup-content</code> box and
        <code>.maplibregl-popup-tip</code> arrow. Those aren't descendants of the host, so target
        them with the <code>className</code> input (or a config default), which lands on the
        <code>.maplibregl-popup</code> container:
      </p>
      <elb-code-block [code]="stylingClassNameSnippet" lang="ts" wrap />
      <p>
        The example uses two Tailwind custom variants (defined once in your global stylesheet) so
        the utilities reach MapLibre's elements:
      </p>
      <elb-code-block [code]="customVariantsSnippet" lang="css" />
    </div>

    <elb-h2 id="configuration"> Configuration </elb-h2>
    <div class="typeset mt-2">
      <p>
        <code>provideMglPopupConfig</code> sets defaults (close button, offset, class name, …) for
        every <code>mgl-popup</code> within its injector scope. Per-popup inputs still win.
      </p>
      <elb-code-block [code]="configSnippet" lang="ts" />
    </div>
  `,
})
export class PopupPage {
  usageSnippet = `<mgl-map [mapStyle]="style" [center]="center" [zoom]="12">
  <mgl-marker [lngLat]="center" #marker="mglMarker">Hamburg</mgl-marker>

  <mgl-popup [marker]="marker" class="flex flex-col gap-1 p-4">
    <p class="text-sm font-medium">Hello from Hamburg 👋</p>
  </mgl-popup>
</mgl-map>`;

  stylingHostSnippet = `<mgl-popup [marker]="marker" class="flex flex-col gap-1 p-4">
  <p class="text-sm font-medium">Hello from Hamburg</p>
  <p class="text-muted-foreground text-xs">Anchored to the marker.</p>
</mgl-popup>`;

  stylingClassNameSnippet = `@Component({
  // …
  providers: [
    provideMglPopupConfig({
      className:
        'popup-tip:invisible max-w-none! popup-content:rounded-xl popup-content:overflow-hidden popup-content:p-0 popup-content:shadow popup-content:ring-1 popup-content:ring-gray-950/5',
    }),
  ],
})`;

  customVariantsSnippet = `/* styles.css */
@custom-variant popup-content (& .maplibregl-popup-content);
@custom-variant popup-tip (& .maplibregl-popup-tip);`;

  configSnippet = `// app.config.ts or a component's providers
providers: [provideMglPopupConfig({ closeButton: false, offset: 16 })];
`;
}
