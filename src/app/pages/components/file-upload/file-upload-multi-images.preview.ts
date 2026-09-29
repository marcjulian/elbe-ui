import { Component } from '@angular/core';
import { ElbFileUploadImports } from '@elbe/ui/file-upload';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideFile, lucideFileUp, lucideTrash, lucideUpload, lucideX } from '@ng-icons/lucide';
import { HlmAttachmentImports } from '@spartan-ng/helm/attachment';
import { HlmButton } from '@spartan-ng/helm/button';
import { HlmEmptyImports } from '@spartan-ng/helm/empty';

@Component({
  selector: 'elb-file-upload-multi-images-preview',
  host: {
    class: 'block w-full max-w-2xl',
  },
  imports: [NgIcon, ElbFileUploadImports, HlmEmptyImports, HlmButton, HlmAttachmentImports],
  providers: [provideIcons({ lucideX, lucideTrash, lucideUpload, lucideFileUp, lucideFile })],
  template: `
    <elb-file-upload append>
      <div
        elbFileUploadTrigger
        #trigger="elbFileUploadTrigger"
        types="image/*"
        dragDrop
        multiple
        hlmEmpty
        class="data-preview:border-input rounded-md p-6 data-placeholder:aspect-video data-preview:h-auto data-preview:border"
      >
        <div elbFileUploadPreview class="flex w-full min-w-0 flex-col gap-3 text-left">
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
            <div class="grid grid-cols-3 gap-3">
              @for (file of files; track file) {
                <div class="relative aspect-square">
                  <img
                    elbFileUploadPreviewImage
                    [index]="$index"
                    class="size-full rounded-md object-cover"
                  />
                  <button
                    elbFileUploadPreview
                    elbFileUploadRemoveBadge
                    [index]="$index"
                    class="-top-1 -right-1"
                  >
                    <ng-icon name="lucideX" />
                  </button>
                </div>
              }
            </div>
          </ng-template>
        </div>
        <hlm-empty-header elbFileUploadPlaceholder>
          <hlm-empty-media variant="icon">
            <ng-icon name="lucideFileUp" />
          </hlm-empty-media>
          <div hlmEmptyTitle>Upload files</div>
          <div hlmEmptyDescription class="flex gap-1">
            <span>Images only</span>
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
export class FileUploadMultiImagesPreview {}
