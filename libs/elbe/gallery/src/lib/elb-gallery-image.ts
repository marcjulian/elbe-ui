import { Directive } from '@angular/core';
import { classes } from '@spartan-ng/helm/utils';

@Directive({
  selector: '[elbGalleryImage]',
  host: {
    'data-slot': 'gallery-image',
  },
})
export class ElbGalleryImage {
  constructor() {
    classes(() => 'size-full object-cover');
  }
}
