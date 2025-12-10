import { computed, Directive, input } from '@angular/core';
import { hlm } from '@spartan-ng/helm/utils';
import type { ClassValue } from 'clsx';

@Directive({
  selector: '[elbGalleryImage]',
  host: {
    'data-slot': 'gallery-image',
    '[class]': '_computedClass()',
  },
})
export class ElbGalleryImage {
  public readonly _userClass = input<ClassValue>('', {
    alias: 'class',
  });
  protected readonly _computedClass = computed(() =>
    hlm('size-full object-cover', this._userClass()),
  );
}
