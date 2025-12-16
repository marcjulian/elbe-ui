import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideEye, lucideGithub } from '@ng-icons/lucide';
import { HlmButtonImports } from '@spartan-ng/helm/button';
import { config } from '../config';
import { BaseLayout } from '../layouts/base.layout';
import { BlockPreview } from '../ui/block-preview';
import { CodeBlock } from '../ui/code-block';
import { H2, H3 } from '../ui/heading';
import { Preview } from '../ui/preview';
import { code, link } from '../ui/typography';
import { DrawerPreview } from './components/drawer/drawer.preview';
import { GalleryCaptionPreview } from './components/gallery/gallery-caption.preview';
import { GalleryCarouselPreview } from './components/gallery/gallery-carousel.preview';
import { galleryStyles } from './components/gallery/gallery-styles';
import { GalleryPreview } from './components/gallery/gallery.preview';

@Component({
  selector: 'elb-home-page',
  imports: [
    HlmButtonImports,
    BaseLayout,
    RouterLink,
    NgIcon,
    Preview,
    BlockPreview,
    H2,
    H3,
    CodeBlock,
    GalleryPreview,
    GalleryCarouselPreview,
    GalleryCaptionPreview,
    GalleryPreview,
    GalleryCarouselPreview,
    DrawerPreview,
  ],
  providers: [provideIcons({ lucideGithub, lucideEye })],
  template: `
    <elb-base-layout>
      <div class="flex flex-col items-center justify-center gap-6 py-10">
        <div class="text-center">
          <h1 class="text-5xl font-bold">elbe/<span class="text-primary">ui</span></h1>
          <p class="text-muted-foreground mt-3 max-w-sm text-xl text-balance">
            Angular UI components built with Tailwind CSS and spartan/ui.
          </p>
        </div>

        <a
          hlmBtn
          variant="outline"
          href="${config.github}"
          target="_blank"
          rel="noopener noreferrer"
        >
          <ng-icon name="lucideGithub" />
          GitHub
        </a>
      </div>

      <div class="flex items-baseline justify-between gap-6">
        <elb-h2 id="gallery">Gallery</elb-h2>
        <a
          hlmBtn
          variant="outline"
          size="sm"
          href="${config.github}/tree/main/libs/elbe/gallery/src/lib"
          target="_blank"
          rel="noopener noreferrer"
        >
          Open in
          <ng-icon name="lucideGithub" />
        </a>
      </div>
      <p class="text-muted-foreground mt-3">
        The gallery component is built using the
        <a href="https://photoswipe.com/" target="_blank" rel="noopener noreferrer" class="${link}"
          >photoswipe</a
        >
        library.
      </p>

      <p class="text-muted-foreground mt-3">
        Install <code class="${code}">npm install photoswipe</code> and add the following style
        import and colors to your CSS file.
      </p>

      <elb-code-block [code]="galleryStyles" fileName="styles.css" class="mt-3" />

      <div class="flex items-baseline justify-between gap-6">
        <elb-h3 id="gallery-preview">Gallery Preview</elb-h3>
        <a
          hlmBtn
          variant="outline"
          size="sm"
          href="${config.github}/tree/main/src/app/pages/components/gallery/gallery.preview.ts"
          target="_blank"
          rel="noopener noreferrer"
        >
          Open in
          <ng-icon name="lucideGithub" />
        </a>
      </div>
      <div elbPreview>
        <elb-gallery-preview />
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
      <p class="text-muted-foreground mt-3">
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

      <p class="text-muted-foreground mt-3">
        Use
        <code class="${code}">elb-gallery-caption</code> to add captions to each image in the
        gallery component.
      </p>
      <div elbPreview>
        <elb-gallery-caption-preview />
      </div>

      <div class="flex items-baseline justify-between gap-6">
        <elb-h2 id="drawer">Drawer</elb-h2>
        <a
          hlmBtn
          variant="outline"
          size="sm"
          href="${config.github}/tree/main/libs/elbe/drawer/src/lib"
          target="_blank"
          rel="noopener noreferrer"
        >
          Open in
          <ng-icon name="lucideGithub" />
        </a>
      </div>
      <p class="text-muted-foreground mt-3">
        The drawer component is built using the
        <a href="https://panejs.com/" target="_blank" rel="noopener noreferrer" class="${link}"
          >Cupertino Panes</a
        >
        library.
      </p>

      <p class="text-muted-foreground mt-3">
        Install <code class="${code}">npm install cupertino-pane</code>.
      </p>

      <div elbPreview>
        <elb-drawer-preview />
      </div>

      <div class="flex items-baseline justify-between gap-6">
        <elb-h3 id="sidebar-drawer-mobile">Sidebar with Drawer on Mobile</elb-h3>
        <div class="flex items-center gap-1">
          <a [routerLink]="['/preview/sidebar-drawer']" hlmBtn variant="outline" size="icon-sm">
            <ng-icon name="lucideEye" />
          </a>
          <a
            hlmBtn
            variant="outline"
            size="sm"
            href="${config.github}/tree/main/src/app/pages/components/gallery/gallery.preview.ts"
            target="_blank"
            rel="noopener noreferrer"
          >
            Open in
            <ng-icon name="lucideGithub" />
          </a>
        </div>
      </div>

      <elb-block-preview name="sidebar-drawer" [showImagesOnMobile]="false" />

      <!-- TODO add sidebar + drawer preview - load example as iframe -->
    </elb-base-layout>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomePage {
  galleryStyles = galleryStyles;
}
