import { Directive, inject } from '@angular/core';
import { classes } from '@spartan-ng/helm/utils';
import { NgpFileUpload } from 'ng-primitives/file-upload';
import { ElbFileUpload } from './elb-file-upload';

@Directive({
  selector: '[elbFileUploadTrigger]',
  hostDirectives: [
    {
      directive: NgpFileUpload,
      inputs: [
        'ngpFileUploadFileTypes:types',
        'ngpFileUploadMultiple:multiple',
        'ngpFileUploadDirectory:directory',
        'ngpFileUploadDragDrop:dragDrop',
        'ngpFileUploadDisabled:disabled',
      ],
      outputs: ['ngpFileUploadSelected:selected', 'ngpFileUploadCanceled:canceled'],
    },
  ],
  host: {
    'data-slot': 'file-upload-trigger',
    '(selected)': 'selected($event)',
    '(canceled)': 'canceled()',
  },
})
export class ElbFileUploadTrigger {
  private readonly _fileUpload = inject(ElbFileUpload);

  constructor() {
    classes(
      () =>
        'data-dragover:bg-muted/50 hover:bg-muted/50 hover:border-muted-foreground/50 data-dragover:border-muted-foreground/50',
    );
  }

  selected(files: FileList | undefined | null): void {
    this._fileUpload.selected(files);
  }

  canceled(): void {
    this._fileUpload.canceled();
  }
}
