import { NumberInput } from '@angular/cdk/coercion';
import { Directive, effect, input, numberAttribute, signal } from '@angular/core';
import { injectElbFileUpload } from './elb-file-upload-token';

@Directive({
  selector: 'img[elbFileUploadPreviewImage]',
  host: {
    'data-slot': 'file-upload-preview-image',
    '[src]': '_previewUrl()',
  },
})
export class ElbFileUploadPreviewImage {
  private readonly _fileUpload = injectElbFileUpload();

  public readonly index = input<number, NumberInput>(0, { transform: numberAttribute });

  protected readonly _previewUrl = signal<string | null>(null);

  constructor() {
    effect((onCleanup) => {
      const files = this._fileUpload.value();
      const file = files?.[this.index()] ?? null;
      const url = file?.type.startsWith('image/') ? URL.createObjectURL(file) : null;

      this._previewUrl.set(url);

      onCleanup(() => {
        if (url) URL.revokeObjectURL(url);
      });
    });
  }
}
