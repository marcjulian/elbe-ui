import { Component } from '@angular/core';
import { ElbFileUploadImports } from '@elbe/ui/file-upload';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideCircleUserRound, lucideX } from '@ng-icons/lucide';
import { HlmEmptyImports } from '@spartan-ng/helm/empty';

@Component({
  selector: 'elb-file-upload-dropzone-preview',
  host: {
    class: 'block w-full max-w-sm',
  },
  imports: [NgIcon, ElbFileUploadImports, HlmEmptyImports],
  providers: [provideIcons({ lucideX, lucideCircleUserRound })],
  template: `
    <elb-file-upload>
      <div hlmEmpty elbFileUploadTrigger dragDrop types="image/*" class="aspect-video">
        <div elbFileUploadPreview class="absolute inset-0">
          <img elbFileUploadPreviewImage class="size-full object-cover" />
        </div>

        <button elbFileUploadPreview elbFileUploadRemoveBadge class="top-2 right-2">
          <ng-icon name="lucideX" />
        </button>

        <hlm-empty-header elbFileUploadPlaceholder>
          <hlm-empty-media variant="icon">
            <ng-icon name="lucideCircleUserRound" />
          </hlm-empty-media>
          <div hlmEmptyTitle class="text-base">Drop your image here or click to browse</div>
          <div hlmEmptyDescription>Max size: 5MB</div>
        </hlm-empty-header>
      </div>
    </elb-file-upload>
  `,
})
export class FileUploadDropzonePreview {}
