import { booleanAttribute, Directive, inject, input } from '@angular/core';
import { BooleanInput } from '@maplibre/ngx-maplibre-gl';
import { classes } from '@spartan-ng/helm/utils';
import { NgpFileUpload, provideFileUploadConfig } from 'ng-primitives/file-upload';
import { ElbFileUpload } from './elb-file-upload';

@Directive({
  selector: '[elbFileUploadTrigger]',
  providers: [provideFileUploadConfig({ dragAndDrop: false })],
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
    '[attr.data-placeholder]': '_hasValue() ? null : ""',
    '[attr.data-preview]': '_hasValue() ? "" : null',
    '(selected)': 'selected($event)',
    '(canceled)': 'canceled()',
  },
})
export class ElbFileUploadTrigger {
  private readonly _fileUpload = inject(ElbFileUpload);
  protected readonly _hasValue = this._fileUpload.hasValue;

  public readonly dragDrop = input<boolean, BooleanInput>(false, { transform: booleanAttribute });

  constructor() {
    classes(() => [
      'relative flex cursor-pointer items-center justify-center overflow-hidden',
      this.dragDrop() &&
        'data-dragover:bg-muted/50 data-placeholder:border-input hover:bg-muted/50 hover:border-muted-foreground/50 data-dragover:border-muted-foreground/50 data-placeholder:border data-placeholder:border-dashed',
    ]);
  }

  selected(files: FileList | undefined | null): void {
    this._fileUpload.selected(files);
  }

  canceled(): void {
    this._fileUpload.canceled();
  }
}
