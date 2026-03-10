import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideGithub } from '@ng-icons/lucide';
import { HlmButtonImports } from '@spartan-ng/helm/button';
import { config } from '../../../config';
import { BaseLayout } from '../../../layouts/base.layout';
import { CodeBlock } from '../../../ui/code-block';
import { H2, H3 } from '../../../ui/heading';
import { Preview } from '../../../ui/preview';
import { code, link } from '../../../ui/typography';
import { mapStyles } from './map-styles';
import { MapPreview } from './map.preview';

@Component({
  selector: 'elb-map-page',
  imports: [BaseLayout, NgIcon, H2, H3, HlmButtonImports, CodeBlock, Preview, MapPreview],
  providers: [provideIcons({ lucideGithub })],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <elb-base-layout mainClasses="pt-8">
      <div class="flex flex-col gap-2">
        <div class="flex justify-between">
          <h1 class="text-3xl font-semibold">Map</h1>
          <a
            hlmBtn
            variant="secondary"
            size="sm"
            href="${config.github}/tree/main/libs/elbe/map/src/lib"
            target="_blank"
            rel="noopener noreferrer"
          >
            Open in
            <ng-icon name="lucideGithub" />
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
      <div class="mt-2 flex flex-col gap-4">
        <p class="text-muted-foreground">
          The map components are an addition to the
          <a
            href="https://github.com/maplibre/ngx-maplibre-gl"
            target="_blank"
            rel="noopener noreferrer"
            class="${link}"
            >ngx-maplibre-gl</a
          >
          library.
        </p>

        <p class="text-muted-foreground">
          Install <code class="${code}">npm install @maplibre/ngx-maplibre-gl maplibre-gl</code>.
        </p>

        <elb-code-block [code]="mapStyles" fileName="styles.css" />
      </div>
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
          <ng-icon name="lucideGithub" />
        </a>
      </div>
      <div elbPreview>
        <elb-map-preview />
      </div>
    </elb-base-layout>
  `,
})
export class MapPage {
  mapStyles = mapStyles;
}
