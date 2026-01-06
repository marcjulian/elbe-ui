import { Directive } from '@angular/core';
import { classes } from '@spartan-ng/helm/utils';

@Directive({
  selector: '[elbDrawerHeader],elb-drawer-header',
  host: {
    'data-slot': 'drawer-header',
  },
})
export class ElbDrawerHeader {
  constructor() {
    classes(() => 'flex flex-col gap-0.5 p-4 text-center md:gap-1.5');
  }
}
