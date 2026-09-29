import { NumberInput } from '@angular/cdk/coercion';
import {
  computed,
  DestroyRef,
  Directive,
  effect,
  inject,
  input,
  numberAttribute,
  signal,
} from '@angular/core';
import { injectElbFileUpload } from './elb-file-upload-token';

@Directive({
  selector: 'img[elbFileUploadPreviewImage]',
  host: {
    'data-slot': 'file-upload-preview-image',
    '[src]': '_previewUrl()',
    '[attr.alt]': '_alt()',
  },
})
export class ElbFileUploadPreviewImage {
  private readonly _fileUpload = injectElbFileUpload();
  private readonly _destroyRef = inject(DestroyRef);

  public readonly index = input<number, NumberInput>(0, { transform: numberAttribute });

  /** Alternative text for the preview image, defaults to the file name. */
  public readonly alt = input<string | null>(null);

  protected readonly _previewUrl = signal<string | null>(null);

  protected readonly _alt = computed(() => {
    const alt = this.alt();
    if (alt !== null) return alt;

    return this._fileUpload.value()?.[this.index()]?.name ?? '';
  });

  /** The file the current object URL was created for. */
  private _renderedFile: File | null = null;
  private _objectUrl: string | null = null;

  constructor() {
    effect(() => {
      const file = this._fileUpload.value()?.[this.index()] ?? null;

      // Keep the existing object URL when the same file stays at this
      // position, otherwise the <img> would reload and flash on every change.
      if (file === this._renderedFile) return;

      if (this._objectUrl) URL.revokeObjectURL(this._objectUrl);

      this._renderedFile = file;
      this._objectUrl = file?.type.startsWith('image/') ? URL.createObjectURL(file) : null;
      this._previewUrl.set(this._objectUrl);
    });

    this._destroyRef.onDestroy(() => {
      if (this._objectUrl) URL.revokeObjectURL(this._objectUrl);
    });
  }
}
