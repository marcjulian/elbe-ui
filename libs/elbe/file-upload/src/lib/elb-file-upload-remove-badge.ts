import { Directive } from '@angular/core';
import { classes } from '@spartan-ng/helm/utils';
import { ElbFileUploadRemove } from './elb-file-upload-remove';

@Directive({
  selector: '[elbFileUploadRemoveBadge],elb-file-upload-remove-badge',
  hostDirectives: [ElbFileUploadRemove],
  host: { 'data-slot': 'file-upload-remove-badge' },
})
export class ElbFileUploadRemoveBadge {
  constructor() {
    classes(() => [
      'bg-primary text-primary-foreground absolute -top-2 -right-2 z-10 inline-flex size-5 items-center justify-center rounded-full ring-2 [&>ng-icon]:text-[length:--spacing(3)]',
    ]);
  }
}
