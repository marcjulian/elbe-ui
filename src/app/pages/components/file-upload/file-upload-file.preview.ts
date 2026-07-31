import { Component } from '@angular/core';
import { ElbFileUploadImports } from '@elbe/ui/file-upload';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideFile, lucideFileUp, lucideX } from '@ng-icons/lucide';

@Component({
  selector: 'elb-file-upload-file-preview',
  imports: [NgIcon, ElbFileUploadImports],
  providers: [provideIcons({ lucideX, lucideFileUp, lucideFile })],
  template: `
    <elb-file-upload>
      <button
        elbFileUploadTrigger
        dragDrop
        types="application/pdf"
        class="data-preview:border-input h-42 w-32 rounded-md data-preview:border"
      >
        <div elbFileUploadPreview class="flex min-w-0 flex-col items-center gap-1 p-2">
          <ng-icon name="lucideFile" />
          <span elbFileUploadMeta field="name"></span>
          <div class="flex max-w-full items-center gap-1">
            <span elbFileUploadMeta field="size"></span>
            <span elbFileUploadMeta field="type"></span>
          </div>
        </div>
        <div elbFileUploadPlaceholder>
          <ng-icon name="lucideFileUp" />
          <p class="text-muted-foreground text-xs">Upload your CV</p>
        </div>
      </button>
      <button elbFileUploadPreview elbFileUploadRemoveBadge class="-top-1 -right-1">
        <ng-icon name="lucideX" />
      </button>
    </elb-file-upload>
  `,
})
export class FileUploadFilePreview {}
