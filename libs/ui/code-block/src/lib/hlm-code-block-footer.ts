import { Directive } from '@angular/core';
import { classes } from '@spartan-ng/helm/utils';

@Directive({
  selector: '[hlmCodeBlockFooter],hlm-code-block-footer',
  exportAs: 'hlmCodeBlockFooter',
  host: { 'data-slot': 'code-block-footer' },
})
export class HlmCodeBlockFooter {
  constructor() {
    classes(
      () =>
        'text-muted-foreground flex min-w-0 shrink-0 items-center gap-2 px-4 pb-4 group-data-[size=sm]/code-block:px-3 group-data-[size=sm]/code-block:pb-3',
    );
  }
}
