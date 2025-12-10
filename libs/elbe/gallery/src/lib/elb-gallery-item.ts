import type { BooleanInput, NumberInput } from '@angular/cdk/coercion';
import {
  ChangeDetectionStrategy,
  Component,
  booleanAttribute,
  computed,
  input,
  numberAttribute,
} from '@angular/core';
import { hlm } from '@spartan-ng/helm/utils';
import { ClassValue } from 'clsx';

@Component({
  selector: 'elb-gallery-item',
  template: `
    <a
      class="cursor-pointer"
      [attr.data-pswp-src]="imageSrc()"
      [attr.data-pswp-width]="width()"
      [attr.data-pswp-height]="height()"
      [attr.data-cropped]="cropped() || undefined"
      target="_blank"
    >
      <ng-content />
    </a>
  `,
  host: {
    'data-slot': 'gallery-item',
    '[class]': '_computedClass()',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ElbGalleryItem {
  public readonly _userClass = input<ClassValue>('', {
    alias: 'class',
  });
  protected readonly _computedClass = computed(() => hlm('', this._userClass()));

  public readonly imageSrc = input.required<string>();
  public readonly width = input.required<number, NumberInput>({ transform: numberAttribute });
  public readonly height = input.required<number, NumberInput>({ transform: numberAttribute });

  /**
   * Whether the thumbnail image is cropped using object-fit: cover.
   * Defaults to true.
   */
  public readonly cropped = input<boolean, BooleanInput>(true, { transform: booleanAttribute });
}
