import { computed, Directive, inject } from '@angular/core';
import { classes } from '@spartan-ng/helm/utils';
import { ElbFileUpload } from './elb-file-upload';

@Directive({
  selector: '[elbFileUploadPlaceholder]',
  host: {
    'data-slot': 'file-upload-placeholder',
    '[attr.data-hidden]': '_hidden() ? true : null',
  },
})
export class ElbFileUploadPlaceholder {
  private readonly _fileUpload = inject(ElbFileUpload);

  protected readonly _hidden = computed(() => this._fileUpload.hasValue());

  constructor() {
    classes(() => 'data-hidden:hidden');
  }
}
