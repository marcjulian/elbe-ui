import { Directive, inject } from '@angular/core';
import { ElbFileUpload } from './elb-file-upload';

@Directive({
  selector: 'button[elbFileUploadRemove]',
  host: {
    'data-slot': 'file-upload-remove',
    '(click)': '_remove()',
  },
})
export class ElbFileUploadRemove {
  private readonly _fileUpload = inject(ElbFileUpload);

  protected _remove(): void {
    this._fileUpload.remove();
  }
}
