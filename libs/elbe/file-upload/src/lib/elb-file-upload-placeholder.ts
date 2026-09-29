import { computed, Directive } from '@angular/core';
import { classes } from '@spartan-ng/helm/utils';
import { injectElbFileUpload } from './elb-file-upload-token';

@Directive({
  selector: '[elbFileUploadPlaceholder]',
  host: {
    'data-slot': 'file-upload-placeholder',
    '[attr.data-hidden]': '_hidden() ? true : null',
  },
})
export class ElbFileUploadPlaceholder {
  private readonly _fileUpload = injectElbFileUpload();

  protected readonly _hidden = computed(() => this._fileUpload.hasValue());

  constructor() {
    classes(() => 'data-hidden:hidden');
  }
}
