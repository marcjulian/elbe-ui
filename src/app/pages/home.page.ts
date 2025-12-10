import { NgOptimizedImage } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ElbGalleryImports } from '@elbe/ui/gallery';
import { HlmButtonImports } from '@spartan-ng/helm/button';
import { HlmCarouselImports } from '@spartan-ng/helm/carousel';

@Component({
  selector: 'elb-home',
  imports: [HlmButtonImports, HlmCarouselImports, NgOptimizedImage, ElbGalleryImports],
  template: `
    <div class="mx-auto max-w-3xl pb-32">
      <div>
        <h1 class="text-3xl font-bold">elbe/ui</h1>
      </div>

      <button hlmBtn variant="outline">Welcome to elbe/ui!</button>

      <div class="flex flex-col gap-20">
        <div>
          <h2>Gallery</h2>
          <elb-gallery class="grid grid-cols-3 gap-4">
            @for (image of images; track $index) {
              <elb-gallery-item
                class="aspect-square overflow-hidden rounded-lg"
                [imageSrc]="image.src"
                [width]="image.width"
                [height]="image.height"
              >
                <img
                  class="size-full object-cover"
                  [ngSrc]="image.previewUrl"
                  [width]="image.previewWidth"
                  [height]="image.previewHeight"
                  [alt]="image.alt"
                  priority
                />
              </elb-gallery-item>
            }
          </elb-gallery>
        </div>

        <div>
          <h2>Carousel</h2>
          <hlm-carousel [options]="{ loop: true }">
            <hlm-carousel-content>
              @for (image of images; track $index) {
                <hlm-carousel-item class="aspect-video overflow-hidden">
                  <img
                    class="size-full object-cover"
                    [ngSrc]="image.src"
                    [width]="image.width"
                    [height]="image.height"
                    [alt]="image.alt"
                    priority
                  />
                </hlm-carousel-item>
              }
            </hlm-carousel-content>
          </hlm-carousel>
        </div>

        <div>
          <h2>Gallery + Carousel</h2>
          <elb-gallery>
            <hlm-carousel [options]="{ loop: true }">
              <hlm-carousel-content>
                @for (image of images; track $index) {
                  <hlm-carousel-item class="aspect-video overflow-hidden">
                    <elb-gallery-item
                      [imageSrc]="image.src"
                      [width]="image.width"
                      [height]="image.height"
                    >
                      <img
                        class="size-full object-cover"
                        [ngSrc]="image.src"
                        [width]="image.width"
                        [height]="image.height"
                        [alt]="image.alt"
                        priority
                      />
                    </elb-gallery-item>
                  </hlm-carousel-item>
                }
              </hlm-carousel-content>
            </hlm-carousel>
          </elb-gallery>
        </div>
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Home {
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
