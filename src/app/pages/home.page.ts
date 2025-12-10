import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideGithub } from '@ng-icons/lucide';
import { HlmButtonImports } from '@spartan-ng/helm/button';
import { config } from '../config';
import { Layout } from '../ui/layout';
import { Preview } from '../ui/preview';
import { code } from '../ui/typography';
import { GalleryCarouselPreview } from './components/gallery/gallery-carousel.preview';
import { GalleryPreview } from './components/gallery/gallery.preview';

@Component({
  selector: 'elb-home-page',
  imports: [HlmButtonImports, Layout, NgIcon, Preview, GalleryPreview, GalleryCarouselPreview],
  providers: [provideIcons({ lucideGithub })],
  template: `
    <elb-layout>
      <div class="flex flex-col items-center justify-center gap-5 py-10">
        <div class="text-center">
          <h1 class="text-5xl font-bold">elbe/ui</h1>
          <p class="text-muted-foreground mt-2 text-xl">Custom spartan/ui components</p>
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

      <h2 id="gallery" class="pt-(--header-height) text-2xl font-semibold">Gallery</h2>
      <p class="text-muted-foreground mt-2">
        The gallery component is built using the
        <a
          href="https://photoswipe.com/"
          target="_blank"
          rel="noopener noreferrer"
          class="underline"
          >photoswipe</a
        >
        library.
      </p>

      <p class="text-muted-foreground mt-2">
        Install <code class="${code}">npm install photoswipe</code> and add the styles to your
        global styles file:<br />
        <code class="${code}">@import 'photoswipe/photoswipe.css' layer(components);</code>
      </p>

      <h3 id="gallery-preview" class="pt-(--header-height) text-xl font-medium">Gallery Preview</h3>
      <div elbPreview>
        <elb-gallery-preview />
      </div>

      <h3 id="gallery-carousel-preview" class="pt-(--header-height) text-xl font-medium">
        Gallery and Carousel Preview
      </h3>
      <p class="text-muted-foreground mt-2">
        Gallery in combination with spartan/ui
        <a
          href="https://spartan.ng/components/carousel"
          target="_blank"
          rel="noopener noreferrer"
          class="underline"
          >carousel</a
        >
        component.
      </p>
      <div elbPreview>
        <elb-gallery-carousel-preview />
      </div>
    </elb-layout>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomePage {
  images: {
    src: string;
    width: number;
    height: number;
    alt: string;
    previewUrl: string;
    previewWidth: number;
    previewHeight: number;
  }[] = [
    {
      src: 'https://images.unsplash.com/photo-1623341214825-9f4f963727da?q=80&w=2370&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      alt: 'A bowl of ramen with chopsticks and a glass of beer',
      width: 2370,
      height: 1580,
      previewUrl:
        'https://images.unsplash.com/photo-1623341214825-9f4f963727da?q=50&w=800&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      previewWidth: 800,
      previewHeight: 533,
    },
    {
      src: 'https://images.unsplash.com/photo-1612927601601-6638404737ce?q=80&w=1287&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      alt: 'Noodles with sliced lemon on black ceramic bowl',
      width: 1287,
      height: 1931,
      previewUrl:
        'https://images.unsplash.com/photo-1612927601601-6638404737ce?q=80&w=800&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      previewWidth: 800,
      previewHeight: 1200,
    },
    {
      src: 'https://images.unsplash.com/photo-1611810174991-5cdd99a2c6b2?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      alt: 'Green vegetable on white ceramic bowl',
      width: 2670,
      height: 1780,
      previewUrl:
        'https://images.unsplash.com/photo-1611810174991-5cdd99a2c6b2?q=80&w=800&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      previewWidth: 800,
      previewHeight: 533,
    },
  ];
}
