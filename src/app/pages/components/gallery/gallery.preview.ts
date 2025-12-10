import { NgOptimizedImage } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ElbGalleryImports } from '@elbe/ui/gallery';

@Component({
  selector: 'elb-gallery-preview',
  imports: [ElbGalleryImports, NgOptimizedImage],
  template: `
    <elb-gallery class="grid grid-cols-3 gap-4">
      @for (image of images; track $index) {
        <elb-gallery-item
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
        </elb-gallery-item>
      }
    </elb-gallery>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GalleryPreview {
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
