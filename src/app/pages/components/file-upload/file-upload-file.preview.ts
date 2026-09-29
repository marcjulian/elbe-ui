import { Component } from '@angular/core';
import { ElbFileUploadImports } from '@elbe/ui/file-upload';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideFileText, lucideFileUp, lucideX } from '@ng-icons/lucide';
import { HlmEmptyImports } from '@spartan-ng/helm/empty';

@Component({
  selector: 'elb-file-upload-file-preview',
  host: {
    class: 'block w-full max-w-sm',
  },
  imports: [NgIcon, ElbFileUploadImports, HlmEmptyImports],
  providers: [provideIcons({ lucideX, lucideFileUp, lucideFileText })],
  template: `
    <elb-file-upload>
      <div
        elbFileUploadTrigger
        dragDrop
        types="application/pdf"
        hlmEmpty
        class="data-preview:border-input aspect-video rounded-md p-6 data-preview:border"
      >
        <hlm-empty-header elbFileUploadPreview class="w-full">
          <hlm-empty-media variant="icon">
            <ng-icon name="lucideFileText" />
          </hlm-empty-media>
          <div hlmEmptyTitle>
            <span
              elbFileUploadMeta
              field="name"
              class="line-clamp-1 w-full whitespace-normal"
            ></span>
          </div>
          <div hlmEmptyDescription class="flex max-w-full items-center gap-1">
            <span elbFileUploadMeta field="type"></span>
            <span aria-hidden="true">·</span>
            <span elbFileUploadMeta field="size"></span>
          </div>
        </hlm-empty-header>
        <hlm-empty-header elbFileUploadPlaceholder>
          <hlm-empty-media variant="icon">
            <ng-icon name="lucideFileUp" />
          </hlm-empty-media>
          <div hlmEmptyTitle>Upload your CV</div>
          <div hlmEmptyDescription>PDF · Max size: 5 MB</div>
        </hlm-empty-header>
      </div>
      <button elbFileUploadPreview elbFileUploadRemoveBadge class="top-2 right-2">
        <ng-icon name="lucideX" />
      </button>
    </elb-file-upload>
  `,
})
export class FileUploadFilePreview {}
