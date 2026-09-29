import {
  Directive,
  effect,
  EmbeddedViewRef,
  inject,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';
import { injectElbFileUpload } from './elb-file-upload-token';

/** Context provided to the `elbFileUploadFiles` template. */
export interface ElbFileUploadFilesContext {
  /** The currently selected files. */
  $implicit: File[];
}

@Directive({ selector: '[elbFileUploadFiles]' })
export class ElbFileUploadFiles {
  private readonly _templateRef = inject<TemplateRef<ElbFileUploadFilesContext>>(TemplateRef);
  private readonly _viewContainerRef = inject(ViewContainerRef);

  private readonly _fileUpload = injectElbFileUpload();

  private _viewRef?: EmbeddedViewRef<ElbFileUploadFilesContext>;

  static ngTemplateContextGuard(
    _dir: ElbFileUploadFiles,
    ctx: unknown,
  ): ctx is ElbFileUploadFilesContext {
    return true;
  }

  constructor() {
    effect(() => {
      const files = this._fileUpload.value();

      if (!files?.length) {
        this._viewContainerRef.clear();
        this._viewRef = undefined;
        return;
      }

      // Reuse the existing view and only update its context, so the rendered
      // items (and their DOM, e.g. image previews) are preserved instead of
      // being destroyed and recreated on every change.
      if (this._viewRef) {
        this._viewRef.context.$implicit = files;
        this._viewRef.markForCheck();
        return;
      }

      this._viewRef = this._viewContainerRef.createEmbeddedView(this._templateRef, {
        $implicit: files,
      });
    });
  }
}
