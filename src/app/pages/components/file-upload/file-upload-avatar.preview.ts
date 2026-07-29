import { Component } from '@angular/core';
import { ElbFileUploadImports } from '@elbe/ui/file-upload';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideCircleUserRound, lucideX } from '@ng-icons/lucide';
import { HlmButton } from '@spartan-ng/helm/button';

@Component({
  selector: 'elb-file-upload-avatar-preview',
  imports: [HlmButton, NgIcon, ElbFileUploadImports],
  providers: [provideIcons({ lucideX, lucideCircleUserRound })],
  template: `
    <elb-file-upload>
      <div class="relative">
        <button
          hlmBtn
          variant="outline"
          elbFileUploadTrigger
          types="image/*"
          class="border-input relative size-16 overflow-hidden rounded-full border-dashed p-0"
        >
          <img elbFileUploadPreview elbFileUploadPreviewImage class="size-full object-cover" />
          <ng-icon elbFileUploadPlaceholder name="lucideCircleUserRound" />
        </button>
        <button
          class="border-background absolute -top-1 -right-1 rounded-full border-2"
          hlmBtn
          size="icon-xs"
          elbFileUploadPreview
          elbFileUploadRemove
        >
          <ng-icon name="lucideX" />
        </button>
      </div>
    </elb-file-upload>
  `,
})
export class FileUploadAvatarPreview {}
