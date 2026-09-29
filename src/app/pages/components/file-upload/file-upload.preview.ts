import { Component } from '@angular/core';
import { ElbFileUploadImports } from '@elbe/ui/file-upload';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideCircleUserRound, lucideX } from '@ng-icons/lucide';
import { HlmButton } from '@spartan-ng/helm/button';

@Component({
  selector: 'elb-file-upload-preview',
  imports: [HlmButton, NgIcon, ElbFileUploadImports],
  providers: [provideIcons({ lucideX, lucideCircleUserRound })],
  template: `
    <elb-file-upload class="gap-2.5">
      <div class="relative">
        <div
          class="border-input flex size-9 items-center justify-center overflow-hidden rounded-md border"
        >
          <img elbFileUploadPreview elbFileUploadPreviewImage class="size-full object-cover" />
          <ng-icon elbFileUploadPlaceholder name="lucideCircleUserRound" />
        </div>
        <button elbFileUploadPreview elbFileUploadRemoveBadge>
          <ng-icon name="lucideX" />
        </button>
      </div>
      <button hlmBtn variant="outline" elbFileUploadTrigger types="image/*">Upload image</button>
    </elb-file-upload>
  `,
})
export class FileUploadPreview {}
