import { Component } from '@angular/core';
import { ElbFileUploadImports } from '@elbe/ui/file-upload';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideCircleUserRound, lucideX } from '@ng-icons/lucide';
import { HlmButton } from '@spartan-ng/helm/button';
import { HlmEmptyImports } from '@spartan-ng/helm/empty';

@Component({
  selector: 'elb-file-upload-dropzone-and-trigger-preview',
  imports: [HlmButton, NgIcon, ElbFileUploadImports, HlmEmptyImports],
  providers: [provideIcons({ lucideX, lucideCircleUserRound })],
  host: { class: 'block w-full max-w-sm' },
  template: `
    <elb-file-upload>
      <div hlmEmpty elbFileUploadDropzone types="image/*" class="aspect-video">
        <div elbFileUploadPreview class="absolute inset-0">
          <img elbFileUploadPreviewImage class="bg-muted/50 size-full object-contain" />
        </div>

        <button elbFileUploadPreview elbFileUploadRemoveBadge class="top-2 right-2">
          <ng-icon name="lucideX" />
        </button>

        <hlm-empty-header elbFileUploadPlaceholder>
          <hlm-empty-media variant="icon">
            <ng-icon name="lucideCircleUserRound" />
          </hlm-empty-media>
          <div hlmEmptyTitle class="text-base">Drop your image here</div>
          <div hlmEmptyDescription>Max size: 5 MB</div>
          <div hlmEmptyContent>
            <button
              hlmBtn
              elbFileUploadTrigger
              types="image/*"
              variant="outline"
              size="sm"
            >
              Select image
            </button>
          </div>
        </hlm-empty-header>
      </div>
    </elb-file-upload>
  `,
})
export class FileUploadDropzoneAndTriggerPreview {}
