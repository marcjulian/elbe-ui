import { Directive } from '@angular/core';
import { classes } from '@spartan-ng/helm/utils';

@Directive({
  selector: '[elbDrawerTitle]',
  host: {
    'data-slot': 'drawer-title',
  },
})
export class ElbDrawerTitle {
  constructor() {
    classes(() => 'text-foreground font-semibold');
  }
}
