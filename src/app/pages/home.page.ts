import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideGithub } from '@ng-icons/lucide';
import { HlmButtonImports } from '@spartan-ng/helm/button';
import { config } from '../config';
import { BaseLayout } from '../layouts/base.layout';
import { DrawerPreview } from './components/drawer/drawer.preview';
import { GalleryCarouselPreview } from './components/gallery/gallery-carousel.preview';
import { galleryStyles } from './components/gallery/gallery-styles';
import { GalleryPreview } from './components/gallery/gallery.preview';
import { MapPreview } from './components/map/map.preview';

@Component({
  selector: 'elb-home-page',
  imports: [
    HlmButtonImports,
    BaseLayout,
    RouterLink,
    NgIcon,
    DrawerPreview,
    GalleryPreview,
    GalleryCarouselPreview,
    MapPreview,
  ],
  providers: [provideIcons({ lucideGithub })],
  template: `
    <elb-base-layout>
      <div class="flex flex-col items-center justify-center gap-6 py-16">
        <div class="text-center">
          <h1 class="text-5xl font-bold">elbe/<span class="text-primary">ui</span></h1>
          <p class="text-muted-foreground mt-3 max-w-sm text-xl text-balance">
            Angular UI components built with Tailwind CSS and spartan/ui.
          </p>
        </div>

        <div class="flex items-center gap-2">
          <a hlmBtn routerLink="/components">View Components</a>
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
      </div>

      <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <elb-drawer-preview
          class="ring-ring/10 bg-card flex h-24 items-center justify-center rounded-xl shadow-sm ring sm:h-full"
        />
        <elb-gallery-carousel-preview />
        <elb-gallery-preview class="sm:col-span-2" />

        <elb-map-preview class="ring-ring/10 shadow-sm ring sm:col-span-2 lg:col-span-3" />
      </div>
    </elb-base-layout>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomePage {
  galleryStyles = galleryStyles;
}
