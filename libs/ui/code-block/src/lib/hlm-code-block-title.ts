import { Directive } from '@angular/core';
import { classes } from '@spartan-ng/helm/utils';

@Directive({
  selector: '[hlmCodeBlockTitle],hlm-code-block-title',
  exportAs: 'hlmCodeBlockTitle',
  host: { 'data-slot': 'code-block-title' },
})
export class HlmCodeBlockTitle {
  constructor() {
    classes(
      () =>
        "text-foreground group-data-[variant=destructive]/code-block:text-destructive min-w-0 truncate font-sans text-sm font-medium group-data-[size=sm]/code-block:text-xs [&_ng-icon]:pointer-events-none [&_ng-icon]:inline-block [&_ng-icon]:align-middle [&_ng-icon:not([class*='text-'])]:text-[length:--spacing(4)] group-data-[size=sm]/code-block:[&_ng-icon:not([class*='text-'])]:text-[length:--spacing(3.5)] *:[ng-icon]:me-1.5",
    );
  }
}
