import { Component } from '@angular/core';
import { ElbFileUploadImports } from '@elbe/ui/file-upload';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideFile, lucideFileUp, lucideTrash, lucideUpload, lucideX } from '@ng-icons/lucide';
import { HlmAttachmentImports } from '@spartan-ng/helm/attachment';
import { HlmButton } from '@spartan-ng/helm/button';
import { HlmEmptyImports } from '@spartan-ng/helm/empty';

@Component({
  selector: 'elb-file-upload-multi-preview',
  host: {
    class: 'block w-full max-w-sm',
  },
  imports: [NgIcon, ElbFileUploadImports, HlmEmptyImports, HlmButton, HlmAttachmentImports],
  providers: [provideIcons({ lucideX, lucideTrash, lucideUpload, lucideFileUp, lucideFile })],
  template: `
    <elb-file-upload append>
      <div
        elbFileUploadTrigger
        #trigger="elbFileUploadTrigger"
        dragDrop
        multiple
        hlmEmpty
        class="data-preview:border-input rounded-md p-6 data-placeholder:aspect-video data-preview:h-auto data-preview:border"
      >
        <div elbFileUploadPreview class="flex w-full min-w-0 flex-col gap-2 text-left">
          <div class="flex gap-2">
            <button hlmBtn variant="outline" size="sm" (click)="trigger.showFileDialog()">
              <ng-icon name="lucideUpload" />
              Add more
            </button>
            <button elbFileUploadRemove hlmBtn variant="outline" size="sm">
              <ng-icon name="lucideTrash" />
              Remove All
            </button>
          </div>

          <ng-template elbFileUploadFiles let-files>
            @for (file of files; track file) {
              <hlm-attachment class="w-full">
                <hlm-attachment-media>
                  <ng-icon name="lucideFile" />
                </hlm-attachment-media>
                <div hlmAttachmentContent>
                  <span hlmAttachmentTitle elbFileUploadMeta field="name" [index]="$index"></span>
                  <span hlmAttachmentDescription class="flex items-center gap-1">
                    <span elbFileUploadMeta field="type" [index]="$index"></span>
                    <span aria-hidden="true">·</span>
                    <span elbFileUploadMeta field="size" [index]="$index"></span>
                  </span>
                </div>
                <hlm-attachment-actions>
                  <button elbFileUploadRemove [index]="$index" hlmAttachmentAction>
                    <ng-icon name="lucideX" />
                  </button>
                </hlm-attachment-actions>
              </hlm-attachment>
            }
          </ng-template>
        </div>
        <hlm-empty-header elbFileUploadPlaceholder>
          <hlm-empty-media variant="icon">
            <ng-icon name="lucideFileUp" />
          </hlm-empty-media>
          <div hlmEmptyTitle>Upload files</div>
          <div hlmEmptyDescription class="flex gap-1">
            <span>All files</span>
            <span aria-hidden="true">·</span>
            <span>Max 10 files</span>
            <span aria-hidden="true">·</span>
            <span>Up to 5 MB each</span>
          </div>
          <div hlmEmptyContent>
            <button hlmBtn variant="outline" size="sm" (click)="trigger.showFileDialog()">
              Select files
            </button>
          </div>
        </hlm-empty-header>
      </div>
    </elb-file-upload>
  `,
})
export class FileUploadMultiPreview {}
