import { InjectionToken, ValueProvider, inject } from '@angular/core';
import type { PhotoSwipeOptions } from 'photoswipe';

export type GalleryOptions = Omit<
  PhotoSwipeOptions,
  'gallery' | 'children' | 'pswpModule' | 'mainClass'
>;

export interface ElbGalleryConfig {
  options: GalleryOptions;
}

const defaultConfig: ElbGalleryConfig = {
  options: {
    bgOpacity: 0.8,
    spacing: 0.1,
    allowPanToNext: true,
    loop: true,
    pinchToClose: true,
    closeOnVerticalDrag: true,
    padding: { top: 0, bottom: 0, right: 0, left: 0 },
    escKey: true,
    arrowKeys: true,
    trapFocus: true,
    returnFocus: true,
    clickToCloseNonZoomable: true,
    preloaderDelay: 2000,
    indexIndicatorSep: ' / ',
    preloadFirstSlide: true,
  },
};

const ElbGalleryConfigToken = new InjectionToken<ElbGalleryConfig>('ElbGalleryConfig');

export function provideElbGalleryConfig(config: Partial<ElbGalleryConfig>): ValueProvider {
  return {
    provide: ElbGalleryConfigToken,
    useValue: { ...defaultConfig, ...config },
  };
}

export function injectElbGalleryConfig(): ElbGalleryConfig {
  return inject(ElbGalleryConfigToken, { optional: true }) ?? defaultConfig;
}
