import type { BooleanInput, NumberInput } from '@angular/cdk/coercion';
import { Directive, booleanAttribute, input, numberAttribute } from '@angular/core';
import { classes } from '@spartan-ng/helm/utils';

@Directive({
  selector: 'a[elbGalleryItem]',
  host: {
    'data-slot': 'gallery-item',
    '[attr.data-pswp-src]': 'imageSrc()',
    '[attr.data-pswp-width]': 'width()',
    '[attr.data-pswp-height]': 'height()',
    '[attr.data-cropped]': 'cropped() || undefined',
    target: '_blank',
  },
})
export class ElbGalleryItem {
  public readonly imageSrc = input.required<string>();
  public readonly width = input.required<number, NumberInput>({ transform: numberAttribute });
  public readonly height = input.required<number, NumberInput>({ transform: numberAttribute });

  /**
   * Whether the thumbnail image is cropped using object-fit: cover.
   * Defaults to true.
   */
  public readonly cropped = input<boolean, BooleanInput>(true, { transform: booleanAttribute });

  constructor() {
    classes(() => 'cursor-pointer');
  }
}
