import { Directive } from '@angular/core';
import { classes } from '@spartan-ng/helm/utils';

@Directive({
  selector: '[elbDrawerDescription]',
  host: {
    'data-slot': 'drawer-description',
  },
})
export class ElbDrawerDescription {
  constructor() {
    classes(() => 'text-muted-foreground text-sm');
  }
}
