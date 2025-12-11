import type { BooleanInput } from '@angular/cdk/coercion';
import {
  Directive,
  OnDestroy,
  afterNextRender,
  booleanAttribute,
  computed,
  input,
  output,
} from '@angular/core';
import { hlm } from '@spartan-ng/helm/utils';
import type { ClassValue } from 'clsx';
import { ElementProvider } from 'photoswipe';
import PhotoSwipeLightbox from 'photoswipe/lightbox';
import { type GalleryOptions, injectElbGalleryConfig } from './elb-gallery.token';

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

  public readonly counterClass = input<ClassValue>('');
  protected readonly _computedCounterClass = computed(() =>
    hlm('pswp_gallery-counter mt-4 ml-5', this.counterClass()),
  );

  public readonly counterTextClass = input<ClassValue>('');
  protected readonly _computedCounterTextClass = computed(() =>
    hlm(
      'bg-muted-foreground/80 text-muted rounded-sm px-2.5 py-1.5 text-xs',
      this.counterTextClass(),
    ),
  );

  public readonly galleryId = input<ElementProvider>(`gallery-${ElbGallery._id++}`);
  public readonly children = input<ElementProvider>('a');

  public readonly options = input<GalleryOptions>();

  public readonly caption = input<boolean, BooleanInput>(false, { transform: booleanAttribute });

  /** events */
  public readonly onClose = output();
  public readonly onDestroy = output();

  protected _lightbox?: PhotoSwipeLightbox;

  constructor() {
    afterNextRender(() => {
      this._lightbox = new PhotoSwipeLightbox({
        gallery: `#${this.galleryId()}`,
        children: this.children(),
        mainClass: this._computedPhotoswipeClass(),
        pswpModule: () => import('photoswipe'),
        ...this._config.options,
        ...this.options(),
      });

      this._lightbox.on('uiRegister', () => {
        this.registerGalleryCounter(this._lightbox!);
        if (this.caption()) {
          this.registerGalleryCaption(this._lightbox!);
        }
      });
      this._lightbox.on('close', () => this.onClose.emit());
      this._lightbox.on('destroy', () => this.onDestroy.emit());

      this._lightbox.init();
    });
  }

  open(index = 0) {
    this._lightbox?.loadAndOpen(index);
  }

  ngOnDestroy(): void {
    this._lightbox?.destroy();
  }

  private registerGalleryCaption(lightbox: PhotoSwipeLightbox) {
    lightbox.pswp!.ui!.registerElement({
      name: 'gallery-caption',
      order: 9,
      isButton: false,
      appendTo: 'root',
      onInit: (captionElement, pswp) => {
        pswp.on('change', () => {
          const currSlideElement = pswp!.currSlide?.data.element;

          if (currSlideElement) {
            const caption = currSlideElement.querySelector('elb-gallery-caption');
            if (caption) {
              captionElement.innerHTML = caption.innerHTML;
            } else {
              captionElement.innerHTML = '';
            }
          }
        });
      },
    });
  }

  private registerGalleryCounter(lightbox: PhotoSwipeLightbox) {
    lightbox.pswp!.ui!.registerElement({
      name: 'gallery-counter',
      order: 5,
      onInit: (counterElement, pswp) => {
        counterElement.className = this._computedCounterClass();
        pswp.on('change', () => {
          counterElement.innerHTML = `<span class="${this._computedCounterTextClass()}">${pswp.currIndex + 1 + pswp.options.indexIndicatorSep + pswp.getNumItems()}</span>`;
        });
      },
    });
  }
}
