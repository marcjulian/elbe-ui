import { Directive } from '@angular/core';
import { classes } from '@spartan-ng/helm/utils';

@Directive({
  selector: '[hlmItemDescription],hlm-item-description',
  host: { 'data-slot': 'item-description' },
})
export class HlmItemDescription {
  constructor() {
    classes(
      () =>
        'text-muted-foreground [&>a:hover]:text-primary line-clamp-2 flex text-start text-sm leading-normal font-normal group-data-[size=xs]/item:text-xs [&>a]:underline [&>a]:underline-offset-4',
    );
  }
}
