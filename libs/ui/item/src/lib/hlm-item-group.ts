import { Directive } from '@angular/core';
import { classes } from '@spartan-ng/helm/utils';

@Directive({
  selector: '[hlmItemGroup],hlm-item-group',
  host: { 'data-slot': 'item-group' },
})
export class HlmItemGroup {
  constructor() {
    classes(
      () =>
        'group/item-group flex w-full flex-col gap-4 has-data-[size=sm]:gap-2.5 has-data-[size=xs]:gap-2',
    );
  }
}
