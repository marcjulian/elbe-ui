import { computed, Directive } from '@angular/core';
import { classes } from '@spartan-ng/helm/utils';
import { injectElbFileUpload } from './elb-file-upload-token';

@Directive({
  selector: '[elbFileUploadPreview]',
  host: {
    'data-slot': 'file-upload-preview',
    '[attr.data-hidden]': '_hidden() ? "" : null',
  },
})
export class ElbFileUploadPreview {
  private readonly _fileUpload = injectElbFileUpload();

  protected readonly _hidden = computed(() => !this._fileUpload.hasValue());

  constructor() {
    classes(() => 'data-hidden:hidden');
  }
}
