import { Component } from '@angular/core';
import { ElbFileUploadImports } from '@elbe/ui/file-upload';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideImageUp, lucideX } from '@ng-icons/lucide';
import { HlmEmptyImports } from '@spartan-ng/helm/empty';

@Component({
  selector: 'elb-file-upload-dropzone-only-preview',
  host: {
    class: 'block w-full max-w-sm',
  },
  imports: [NgIcon, ElbFileUploadImports, HlmEmptyImports],
  providers: [provideIcons({ lucideX, lucideImageUp })],
  template: `
    <elb-file-upload>
      <div hlmEmpty elbFileUploadDropzone types="image/*" class="aspect-video">
        <div elbFileUploadPreview class="absolute inset-0">
          <img elbFileUploadPreviewImage class="size-full object-cover" />
        </div>

        <button elbFileUploadPreview elbFileUploadRemoveBadge class="top-2 right-2">
          <ng-icon name="lucideX" />
        </button>

        <hlm-empty-header elbFileUploadPlaceholder>
          <hlm-empty-media variant="icon">
            <ng-icon name="lucideImageUp" />
          </hlm-empty-media>
          <div hlmEmptyTitle class="text-base">Drag and drop your image here</div>
          <div hlmEmptyDescription>Max size: 5 MB</div>
        </hlm-empty-header>
      </div>
    </elb-file-upload>
  `,
})
export class FileUploadDropzoneOnlyPreview {}
