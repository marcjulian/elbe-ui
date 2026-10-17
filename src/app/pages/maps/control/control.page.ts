import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ElbHighlightImports } from '@elbe/ui/highlight';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { simpleGithub } from '@ng-icons/simple-icons';
import { HlmButtonImports } from '@spartan-ng/helm/button';
import { config } from '../../../config';
import { H2 } from '../../../ui/heading';
import { Preview } from '../../../ui/preview';
import { ControlPreview } from './control.preview';

@Component({
  selector: 'elb-control-page',
  imports: [NgIcon, RouterLink, H2, HlmButtonImports, ElbHighlightImports, Preview, ControlPreview],
  providers: [provideIcons({ simpleGithub })],
  template: `
    <div class="flex flex-col gap-2">
      <div class="flex justify-between">
        <h1 class="text-3xl font-semibold">Controls</h1>
        <a
          hlmBtn
          variant="outline"
          size="sm"
          href="${config.github}/tree/main/libs/map/control/src/lib"
          target="_blank"
          rel="noopener noreferrer"
        >
          Open in
          <ng-icon name="simpleGithub" />
        </a>
      </div>
      <p class="text-muted-foreground">Place any content in the map's corners.</p>
    </div>

    <div elbPreview>
      <elb-control-preview />
    </div>

    <elb-h2 id="usage"> Usage </elb-h2>
    <div class="typeset mt-2">
      <p>
        <code>MglControl</code> (<code>[mglControl]</code> / <code>mgl-control</code>) renders its
        projected content as a map control. Use <code>position</code> to choose a corner.
      </p>
      <elb-code-block [code]="usageSnippet" lang="html" />
    </div>

    <elb-h2 id="native-controls"> Native controls </elb-h2>
    <div class="typeset mt-2">
      <p>
        Apply one of the native MapLibre control directives to a <code>mgl-control</code> to add the
        built-in control:
      </p>
      <ul class="list-disc">
        <li><code>mglNavigation</code> — zoom &amp; compass.</li>
        <li><code>mglScale</code> — scale bar.</li>
        <li><code>mglFullscreen</code> — fullscreen toggle.</li>
        <li><code>mglGeolocate</code> — locate the user.</li>
        <li><code>mglGlobe</code> — projection toggle.</li>
        <li><code>mglAttribution</code> — attribution.</li>
        <li><code>mglTerrain</code> — terrain toggle.</li>
      </ul>
      <elb-code-block [code]="nativeSnippet" lang="html" />
      <p>
        Looking for spartan/ui styled controls?
        <a routerLink="/components/map-controls">See Map Controls</a>.
      </p>
    </div>
  `,
})
export class ControlPage {
  usageSnippet = `<mgl-map [mapStyle]="style" [center]="center" [zoom]="8">
  <mgl-control position="bottom-left">
    <a href="https://www.maptiler.com">MapTiler</a>
  </mgl-control>
</mgl-map>`;

  nativeSnippet = `<mgl-control mglNavigation position="top-right"></mgl-control>
<mgl-control mglScale unit="metric" position="bottom-right"></mgl-control>`;
}
