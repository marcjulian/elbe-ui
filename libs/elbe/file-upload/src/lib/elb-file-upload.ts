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

export const ELB_FILE_UPLOAD_CONTROL_VALUE_ACCESSOR = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => ElbFileUpload),
  multi: true,
};

@Directive({
  selector: '[elbFileUpload],elb-file-upload',
  providers: [ELB_FILE_UPLOAD_CONTROL_VALUE_ACCESSOR],
  host: { 'data-slot': 'file-upload' },
})
export class ElbFileUpload implements ControlValueAccessor {
  protected _onChange?: ChangeFn<File[] | undefined | null>;
  protected _onTouched?: TouchFn;

  /** Whether the file upload is disabled */
  public readonly disabled = input<boolean, BooleanInput>(false, { transform: booleanAttribute });

  protected readonly _disabled = linkedSignal(this.disabled);

  public readonly value = model<File[] | undefined | null>(null);

  public readonly hasValue = computed(() => {
    const v = this.value();
    return v !== null && v !== undefined && v.length > 0;
  });

  constructor() {
    classes(() => 'flex items-center gap-2');
  }

  selected(selectedFiles: FileList | undefined | null): void {
    const files = selectedFiles ? Array.from(selectedFiles) : selectedFiles;

    this.value.set(files);
    this._onTouched?.();
    this._onChange?.(files);
  }

  remove(): void {
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
