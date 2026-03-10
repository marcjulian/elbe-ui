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
import { GalleryCaptionPreview } from './gallery-caption.preview';
import { GalleryCarouselPreview } from './gallery-carousel.preview';
import { galleryStyles } from './gallery-styles';
import { GalleryPreview } from './gallery.preview';

@Component({
  selector: 'elb-gallery-page',
  imports: [
    BaseLayout,
    HlmButtonImports,
    NgIcon,
    H2,
    H3,
    Preview,
    CodeBlock,
    GalleryPreview,
    GalleryCaptionPreview,
    GalleryCarouselPreview,
  ],
  providers: [provideIcons({ lucideGithub })],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <elb-base-layout mainClasses="pt-8">
      <div class="flex flex-col gap-2">
        <div class="flex justify-between">
          <h1 class="text-3xl font-semibold">Gallery</h1>
          <a
            hlmBtn
            variant="secondary"
            size="sm"
            href="${config.github}/tree/main/libs/elbe/gallery/src/lib"
            target="_blank"
            rel="noopener noreferrer"
          >
            Open in
            <ng-icon name="lucideGithub" />
          </a>
        </div>
        <p class="text-muted-foreground">Image gallery built with photoswipe.</p>
      </div>

      <div elbPreview>
        <elb-gallery-preview />
      </div>

      <elb-h2 id="installation"> Installation </elb-h2>
      <div class="mt-2 flex flex-col gap-4">
        <p class="text-muted-foreground">
          The gallery component is built using the
          <a
            href="https://photoswipe.com/"
            target="_blank"
            rel="noopener noreferrer"
            class="${link}"
            >photoswipe</a
          >
          library.
        </p>

        <p class="text-muted-foreground">
          Install <code class="${code}">npm install photoswipe</code> and add the following style
          import and colors to your CSS file.
        </p>

        <elb-code-block [code]="galleryStyles" fileName="styles.css" />
      </div>

      <div class="flex items-baseline justify-between gap-6">
        <elb-h3 id="gallery-carousel-preview"> Gallery and Carousel Preview </elb-h3>
        <a
          hlmBtn
          variant="outline"
          size="sm"
          href="${config.github}/tree/main/src/app/pages/components/gallery/gallery-carousel.preview.ts"
          target="_blank"
          rel="noopener noreferrer"
        >
          Open in
          <ng-icon name="lucideGithub" />
        </a>
      </div>
      <p class="text-muted-foreground mt-2">
        Gallery in combination with spartan/ui
        <a
          href="https://spartan.ng/components/carousel"
          target="_blank"
          rel="noopener noreferrer"
          class="${link}"
          >carousel</a
        >
        component.
      </p>
      <div elbPreview>
        <elb-gallery-carousel-preview />
      </div>

      <div class="flex items-baseline justify-between gap-6">
        <elb-h3 id="gallery-caption-preview"> Gallery Caption </elb-h3>
        <a
          hlmBtn
          variant="outline"
          size="sm"
          href="${config.github}/tree/main/src/app/pages/components/gallery/gallery-caption.preview.ts"
          target="_blank"
          rel="noopener noreferrer"
        >
          Open in
          <ng-icon name="lucideGithub" />
        </a>
      </div>

      <p class="text-muted-foreground mt-2">
        Use
        <code class="${code}">elb-gallery-caption</code> to add captions to each image in the
        gallery component.
      </p>
      <div elbPreview>
        <elb-gallery-caption-preview />
      </div>
    </elb-base-layout>
  `,
})
export class GalleryPage {
  galleryStyles = galleryStyles;
}
