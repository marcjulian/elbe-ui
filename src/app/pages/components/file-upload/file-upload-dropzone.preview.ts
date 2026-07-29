import { Component } from '@angular/core';
import { ElbFileUploadImports } from '@elbe/ui/file-upload';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideCircleUserRound, lucideX } from '@ng-icons/lucide';
import { HlmEmptyImports } from '@spartan-ng/helm/empty';

@Component({
  selector: 'elb-file-upload-dropzone-preview',
  imports: [NgIcon, ElbFileUploadImports, HlmEmptyImports],
  providers: [provideIcons({ lucideX, lucideCircleUserRound })],
  template: `
    <elb-file-upload>
      <button
        elbFileUploadTrigger
        types="image/*"
        hlmEmpty
        class="border-input border border-dashed"
      >
        <img elbFileUploadPreview elbFileUploadPreviewImage class="size-full object-cover" />

        <hlm-empty-header elbFileUploadPlaceholder>
          <hlm-empty-media variant="icon">
            <ng-icon name="lucideCircleUserRound" />
          </hlm-empty-media>
          <div hlmEmptyTitle class="text-base">Drop your image here or click to browse</div>
          <div hlmEmptyDescription>Max size: 5MB</div>
        </hlm-empty-header>
      </button>
    </elb-file-upload>
  `,
})
export class FileUploadDropzonePreview {}
