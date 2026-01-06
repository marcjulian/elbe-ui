import { Directive } from '@angular/core';
import { classes } from '@spartan-ng/helm/utils';

@Directive({
  selector: '[elbDrawerFooter],elb-drawer-footer',
  host: {
    'data-slot': 'drawer-footer',
  },
})
export class ElbDrawerFooter {
  constructor() {
    classes(() => 'mt-auto flex flex-col gap-2 p-4');
  }
}
