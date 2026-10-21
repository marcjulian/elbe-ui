import { Component } from '@angular/core';
import { ElbHighlightImports } from '@elbe/ui/highlight';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { simpleGithub } from '@ng-icons/simple-icons';
import { HlmButtonImports } from '@spartan-ng/helm/button';
import { config } from '../../../config';
import { H2 } from '../../../ui/heading';
import { Preview } from '../../../ui/preview';
import { ImagePreview } from './image.preview';

@Component({
  selector: 'elb-image-page',
  imports: [NgIcon, H2, HlmButtonImports, ElbHighlightImports, Preview, ImagePreview],
  providers: [provideIcons({ simpleGithub })],
  template: `
    <div class="flex flex-col gap-2">
      <div class="flex justify-between">
        <h1 class="text-3xl font-semibold">Image</h1>
        <a
          hlmBtn
          variant="outline"
          size="sm"
          href="${config.github}/tree/main/libs/map/image/src/lib"
          target="_blank"
          rel="noopener noreferrer"
        >
          Open in
          <ng-icon name="simpleGithub" />
        </a>
      </div>
      <p class="text-muted-foreground">
        Register an image in the map style for icons, symbols and patterns.
      </p>
    </div>

    <div elbPreview>
      <elb-image-preview />
    </div>

    <elb-h2 id="usage"> Usage </elb-h2>
    <div class="typeset mt-2">
      <p>
        <code>MglImage</code> is a directive (<code>[mglImage]</code> or <code>mgl-image</code>).
        Add it inside <code>mgl-map</code>, then reference its <code>id</code> from a layer.
      </p>
      <elb-code-block [code]="usageSnippet" lang="html" wrap />
      <p>
        Because the directive does not render anything, the attribute selector also works on an
        <code>ng-container</code>:
      </p>
      <elb-code-block [code]="attributeSnippet" lang="html" />
    </div>

    <elb-h2 id="svg-icons"> SVG icons </elb-h2>
    <div class="typeset mt-2">
      <p>
        The example uses icons from <code>&#64;ng-icons/lucide</code> as they are. They are SVG
        strings, while MapLibre style images are bitmaps. <code>addImage</code> does not parse SVG
        markup, and <code>loadImage</code> only supports PNG, JPEG and WebP. Use
        <code>svgToImage</code> from <code>&#64;elbe-ui/map/image</code> to load the SVG into an
        <code>HTMLImageElement</code> that MapLibre can register.
      </p>
      <elb-code-block [code]="lucideSnippet" lang="ts" wrap />
      <p>Each GeoJSON feature references one of the registered image ids:</p>
      <elb-code-block [code]="layerSnippet" lang="html" wrap />
    </div>

    <elb-h2 id="data-or-url"> Data or URL </elb-h2>
    <div class="typeset mt-2">
      <p>
        Use <code>data</code> for an image that is already available, or <code>url</code> to let
        MapLibre load it. The example uses <code>data</code> because the lucide icons are rendered
        in the browser.
      </p>
      <elb-code-block [code]="dataSnippet" lang="html" />
      <p>
        <code>imageLoaded</code> fires once the image is registered and <code>imageError</code> when
        a <code>url</code> cannot be loaded. Both outputs are optional and can be used for UI state
        or logging.
      </p>
      <elb-code-block [code]="eventSnippet" lang="html" />
    </div>

    <elb-h2 id="options"> Options </elb-h2>
    <div class="typeset mt-2">
      <p>
        <code>options</code> maps to MapLibre's image metadata. Use <code>pixelRatio</code> for
        high-DPI images and <code>sdf</code> when the image is tinted through
        <code>icon-color</code>. Stretchable images also accept <code>content</code>,
        <code>stretchX</code> and <code>stretchY</code>.
      </p>
      <elb-code-block [code]="optionsSnippet" lang="html" />
    </div>

    <elb-h2 id="style-reloads"> Style reloads </elb-h2>
    <div class="typeset mt-2">
      <p>
        Runtime images are cleared when the style changes. The directive listens for
        <code>styledata</code> and registers the image again, so switching between light and dark
        styles keeps the icons available.
      </p>
    </div>
  `,
})
export class ImagePage {
  usageSnippet = `<mgl-map [mapStyle]="style" [center]="center" [zoom]="11">
  @for (icon of icons(); track icon.id) {
    <mgl-image [id]="icon.id" [data]="icon.data" [options]="{ pixelRatio: 2 }" />
  }

  <mgl-geojson-source id="places" [data]="places" />

  <mgl-layer
    id="places"
    type="symbol"
    source="places"
    [layout]="{ 'icon-image': ['get', 'icon'], 'icon-size': 0.75 }"
  />
</mgl-map>`;

  attributeSnippet = `<ng-container mglImage id="cafe" [data]="cafeIcon" />`;

  lucideSnippet = `import { lucideCoffee, lucideLandmark, lucideShoppingBag } from '@ng-icons/lucide';
import { svgToImage } from '@elbe-ui/map/image';

const ICONS = [
  { id: 'cafe', icon: lucideCoffee },
  { id: 'shop', icon: lucideShoppingBag },
  { id: 'landmark', icon: lucideLandmark },
];

async function loadIcons() {
  return Promise.all(
    ICONS.map(async ({ id, icon }) => ({
      id,
      data: await svgToImage(icon),
    })),
  );
}`;

  layerSnippet = `<mgl-layer
  id="places"
  type="symbol"
  source="places"
  [layout]="{
    'icon-image': ['get', 'icon'],
    'icon-size': 0.75,
    'icon-allow-overlap': true
  }"
/>

<!-- GeoJSON feature -->
{ "properties": { "name": "Café", "icon": "cafe" } }`;

  dataSnippet = `<mgl-image
  id="cafe"
  [data]="cafeIcon"
  [options]="{ pixelRatio: 2 }"
/>`;

  eventSnippet = `<mgl-image
  id="cafe"
  [data]="cafeIcon"
  (imageLoaded)="imageLoaded.set(true)"
  (imageError)="imageError.set($event)"
/>`;

  optionsSnippet = `<!-- Tintable SDF icon -->
<mgl-image id="dot" url="/assets/dot.png" [options]="{ sdf: true, pixelRatio: 2 }" />

<!-- Stretchable image for icon-text-fit -->
<mgl-image
  id="frame"
  url="/assets/frame.png"
  [options]="{ content: [16, 16, 300, 384], stretchX: [[16, 584]], stretchY: [[16, 384]] }"
/>`;
}
