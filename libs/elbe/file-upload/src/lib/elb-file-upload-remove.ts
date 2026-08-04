import { NumberInput } from '@angular/cdk/coercion';
import { Directive, input, numberAttribute } from '@angular/core';
import { injectElbFileUpload } from './elb-file-upload-token';

@Directive({
  selector: 'button[elbFileUploadRemove]',
  host: {
    'data-slot': 'file-upload-remove',
    '(click)': '_remove($event)',
  },
})
export class ElbFileUploadRemove {
  private readonly _fileUpload = injectElbFileUpload();

  public readonly index = input<number | undefined, NumberInput>(undefined, {
    transform: numberAttribute,
  });

  protected _remove(event: Event): void {
    event.stopPropagation();
    const index = this.index();
    if (index === undefined) {
      this._fileUpload.removeAll();
    } else {
      this._fileUpload.removeFile(index);
    }
  }
}
