import { Directive, effect, inject, TemplateRef, ViewContainerRef } from '@angular/core';
import { injectElbFileUpload } from './elb-file-upload-token';

@Directive({ selector: '[elbFileUploadFiles]' })
export class ElbFileUploadFiles {
  private readonly _templateRef = inject(TemplateRef);
  private readonly _viewContainerRef = inject(ViewContainerRef);

  private readonly _fileUpload = injectElbFileUpload();

  constructor() {
    effect(() => {
      const files = this._fileUpload.value();
      if (files?.length) {
        this._viewContainerRef.clear();
        this._viewContainerRef.createEmbeddedView(this._templateRef, {
          $implicit: files,
        });
      } else {
        this._viewContainerRef.clear();
      }
    });
  }
}
