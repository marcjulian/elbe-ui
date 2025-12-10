import { NgOptimizedImage } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ElbGalleryImports } from '@elbe/ui/gallery';
import { images } from './images';

@Component({
  selector: 'elb-gallery-preview',
  imports: [ElbGalleryImports, NgOptimizedImage],
  template: `
    <elb-gallery class="grid grid-cols-3 gap-4">
      @for (image of images; track $index) {
        <a
          elbGalleryItem
          class="aspect-square overflow-hidden rounded-lg"
          [imageSrc]="image.src"
          [width]="image.width"
          [height]="image.height"
        >
          <img
            elbGalleryImage
            [ngSrc]="image.previewUrl"
            [width]="image.previewWidth"
            [height]="image.previewHeight"
            [alt]="image.alt"
            priority
          />
        </a>
      }
    </elb-gallery>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GalleryPreview {
  images = images;
}
