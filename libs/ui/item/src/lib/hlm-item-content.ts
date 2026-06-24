import { Directive } from '@angular/core';
import { classes } from '@spartan-ng/helm/utils';

@Directive({
  selector: '[hlmItemContent],hlm-item-content',
  host: { 'data-slot': 'item-content' },
})
export class HlmItemContent {
  constructor() {
    classes(
      () =>
        'flex flex-1 flex-col gap-1 group-data-[size=xs]/item:gap-0 [&+[data-slot=item-content]]:flex-none',
    );
  }
}
