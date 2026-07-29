import { computed, Directive, inject } from '@angular/core';
import { classes } from '@spartan-ng/helm/utils';
import { ElbFileUpload } from './elb-file-upload';

@Directive({
  selector: '[elbFileUploadPreview]',
  host: {
    'data-slot': 'file-upload-preview',
    '[attr.data-hidden]': '_hidden() ? "" : null',
  },
})
export class ElbFileUploadPreview {
  private readonly _fileUpload = inject(ElbFileUpload);

  protected readonly _hidden = computed(() => !this._fileUpload.hasValue());

  constructor() {
    classes(() => 'data-hidden:hidden');
  }
}
