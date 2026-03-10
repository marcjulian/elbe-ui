import { NgOptimizedImage } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ElbGalleryImports } from '@elbe/ui/gallery';
import { HlmCarouselImports } from '@spartan-ng/helm/carousel';
import { images } from './images';

@Component({
  selector: 'elb-gallery-carousel-preview',
  imports: [ElbGalleryImports, NgOptimizedImage, HlmCarouselImports],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <elb-gallery>
      <hlm-carousel [options]="{ loop: true }">
        <hlm-carousel-content>
          @for (image of images; track $index) {
            <hlm-carousel-item>
              <a
                elbGalleryItem
                class="flex aspect-video overflow-hidden rounded-xl"
                [imageSrc]="image.src"
                [width]="image.width"
                [height]="image.height"
              >
                <img
                  elbGalleryImage
                  [ngSrc]="image.src"
                  [width]="image.width"
                  [height]="image.height"
                  [alt]="image.alt"
                  priority
                />
              </a>
            </hlm-carousel-item>
          }
        </hlm-carousel-content>
      </hlm-carousel>
    </elb-gallery>
  `,
})
export class GalleryCarouselPreview {
  images = images;
}
