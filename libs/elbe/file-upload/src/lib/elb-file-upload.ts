import { BooleanInput } from '@angular/cdk/coercion';
import {
  booleanAttribute,
  computed,
  Directive,
  forwardRef,
  input,
  linkedSignal,
  model,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { ChangeFn, TouchFn } from '@spartan-ng/brain/forms';
import { classes } from '@spartan-ng/helm/utils';
import { provideElbFileUpload } from './elb-file-upload-token';

export const ELB_FILE_UPLOAD_CONTROL_VALUE_ACCESSOR = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => ElbFileUpload),
  multi: true,
};

@Directive({
  selector: '[elbFileUpload],elb-file-upload',
  exportAs: 'elbFileUpload',
  providers: [ELB_FILE_UPLOAD_CONTROL_VALUE_ACCESSOR, provideElbFileUpload(ElbFileUpload)],
  host: { 'data-slot': 'file-upload' },
})
export class ElbFileUpload implements ControlValueAccessor {
  protected _onChange?: ChangeFn<File[] | undefined | null>;
  protected _onTouched?: TouchFn;

  /** Whether the file upload is disabled */
  public readonly disabled = input<boolean, BooleanInput>(false, { transform: booleanAttribute });

  /** Whether new selections should be added to the existing files */
  public readonly append = input<boolean, BooleanInput>(false, { transform: booleanAttribute });

  protected readonly _disabled = linkedSignal(this.disabled);

  public readonly value = model<File[] | undefined | null>(null);

  public readonly hasValue = computed(() => {
    const v = this.value();
    return v !== null && v !== undefined && v.length > 0;
  });

  constructor() {
    classes(() => 'relative flex w-full items-center');
  }

  selected(selectedFiles: FileList | undefined | null): void {
    const files = selectedFiles ? Array.from(selectedFiles) : selectedFiles;
    const nextValue = this.append() && files ? [...(this.value() ?? []), ...files] : files;

    this.value.set(nextValue);
    this._onTouched?.();
    this._onChange?.(nextValue);
  }

  removeFile(index: number): void {
    const files = this.value();
    if (files === null || files === undefined || index < 0 || index >= files.length) return;

    const nextValue = files.filter((_, fileIndex) => fileIndex !== index);
    this.value.set(nextValue);
    this._onTouched?.();
    this._onChange?.(nextValue);
  }

  removeAll(): void {
    this.value.set(null);
    this._onTouched?.();
    this._onChange?.(null);
  }

  canceled(): void {
    this._onTouched?.();
  }

  /** CONTROL VALUE ACCESSOR */
  writeValue(value: File[] | undefined | null): void {
    this.value.set(value);
  }

  registerOnChange(fn: ChangeFn<File[] | undefined | null>): void {
    this._onChange = fn;
  }

  registerOnTouched(fn: TouchFn): void {
    this._onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    this._disabled.set(isDisabled);
  }
}
