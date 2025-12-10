import { Directive, OnDestroy, afterNextRender, computed, input, output } from '@angular/core';
import { hlm } from '@spartan-ng/helm/utils';
import { ClassValue } from 'clsx';
import { ElementProvider } from 'photoswipe';
import PhotoSwipeLightbox from 'photoswipe/lightbox';
import { GalleryOptions, injectElbGalleryConfig } from './elb-gallery.token';

@Directive({
  selector: '[elbGallery],elb-gallery',
  exportAs: 'elbGallery',
  host: {
    'data-slot': 'gallery',
    '[id]': 'galleryId()',
    '[class]': '_computedClass()',
  },
})
export class ElbGallery implements OnDestroy {
  private static _id = 0;

  private readonly _config = injectElbGalleryConfig();

  public readonly _userClass = input<ClassValue>('', {
    alias: 'class',
  });
  protected readonly _computedClass = computed(() => hlm(this._userClass()));

  public readonly photoswipeClass = input<ClassValue>();
  protected readonly _computedPhotoswipeClass = computed(() =>
    hlm(
      '[--pswp-bg:var(--color-foreground)]',
      '[--pswp-icon-color-secondary:var(--color-muted-foreground)] [--pswp-icon-color:var(--color-muted)] [--pswp-icon-stroke-color:var(--color-muted-foreground)]',
      this.photoswipeClass(),
    ),
  );

  public readonly galleryId = input<ElementProvider>(`gallery-${ElbGallery._id++}`);
  public readonly children = input<ElementProvider>('a');

  public readonly options = input<GalleryOptions>(this._config.options);

  /** events */
  public readonly onClose = output();
  public readonly onDestroy = output();

  protected lightbox?: PhotoSwipeLightbox;

  constructor() {
    afterNextRender(() => {
      this.lightbox = new PhotoSwipeLightbox({
        gallery: `#${this.galleryId()}`,
        children: this.children(),
        mainClass: this._computedPhotoswipeClass(),
        pswpModule: () => import('photoswipe'),
        ...this.options(),
      });

      this.lightbox.on('close', () => this.onClose.emit());
      this.lightbox.on('destroy', () => this.onDestroy.emit());

      this.lightbox.init();
    });
  }

  open(index = 0) {
    this.lightbox?.loadAndOpen(index);
  }

  ngOnDestroy(): void {
    this.lightbox?.destroy();
  }
}
