import { Component } from '@angular/core';
import { ElbFileUploadImports } from '@elbe/ui/file-upload';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideFile, lucideFileUp, lucideX } from '@ng-icons/lucide';
import { HlmEmptyImports } from '@spartan-ng/helm/empty';

@Component({
  selector: 'elb-file-upload-file-preview',
  host: {
    class: 'block w-full max-w-sm',
  },
  imports: [NgIcon, ElbFileUploadImports, HlmEmptyImports],
  providers: [provideIcons({ lucideX, lucideFileUp, lucideFile })],
  template: `
    <elb-file-upload>
      <button
        elbFileUploadTrigger
        dragDrop
        types="application/pdf"
        hlmEmpty
        class="data-preview:border-input aspect-video rounded-md data-preview:border"
      >
        <div elbFileUploadPreview class="flex min-w-0 flex-col items-center gap-1 p-2">
          <ng-icon name="lucideFile" />
          <span elbFileUploadMeta field="name"></span>
          <div class="flex max-w-full items-center gap-1">
            <span elbFileUploadMeta field="size"></span>
            <span elbFileUploadMeta field="type"></span>
          </div>
        </div>
        <hlm-empty-header elbFileUploadPlaceholder>
          <hlm-empty-media variant="icon">
            <ng-icon name="lucideFileUp" />
          </hlm-empty-media>
          <div hlmEmptyTitle>Upload your CV</div>
          <div hlmEmptyDescription>Max size: 5 MB</div>
        </hlm-empty-header>
      </button>
      <button elbFileUploadPreview elbFileUploadRemoveBadge class="top-2 right-2">
        <ng-icon name="lucideX" />
      </button>
    </elb-file-upload>
  `,
})
export class FileUploadFilePreview {}
