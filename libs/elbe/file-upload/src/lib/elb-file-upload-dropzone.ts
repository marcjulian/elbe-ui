import { Directive, inject } from '@angular/core';
import { classes } from '@spartan-ng/helm/utils';
import { NgpFileDropzone } from 'ng-primitives/file-upload';
import { ElbFileUpload } from './elb-file-upload';

@Directive({
  selector: '[elbFileUploadDropzone]',
  hostDirectives: [
    {
      directive: NgpFileDropzone,
      inputs: [
        'ngpFileDropzoneFileTypes:types',
        'ngpFileDropzoneMultiple:multiple',
        'ngpFileDropzoneDirectory:directory',
        'ngpFileDropzoneDisabled:disabled',
      ],
      outputs: ['ngpFileDropzoneSelected:selected', 'ngpFileDropzoneRejected:canceled'],
    },
  ],
  host: {
    'data-slot': 'file-upload-dropzone',
    '[attr.data-placeholder]': '_hasValue() ? null : ""',
    '[attr.data-preview]': '_hasValue() ? "" : null',
    '(selected)': 'selected($event)',
    '(canceled)': 'canceled()',
  },
})
export class ElbFileUploadDropzone {
  private readonly _fileUpload = inject(ElbFileUpload);
  protected readonly _hasValue = this._fileUpload.hasValue;

  constructor() {
    classes(() => [
      'relative flex items-center justify-center overflow-hidden',
      'data-dragover:bg-muted/50 data-placeholder:border-input data-dragover:border-muted-foreground/50 data-placeholder:border data-placeholder:border-dashed',
    ]);
  }

  selected(files: FileList | undefined | null): void {
    this._fileUpload.selected(files);
  }

  canceled(): void {
    this._fileUpload.canceled();
  }
}
