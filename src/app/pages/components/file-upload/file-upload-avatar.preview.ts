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
        <button elbFileUploadTrigger dragDrop types="image/*" class="size-16 rounded-full">
          <img elbFileUploadPreview elbFileUploadPreviewImage class="size-full object-cover" />
          <ng-icon elbFileUploadPlaceholder name="lucideCircleUserRound" />
        </button>
        <button
          elbFileUploadPreview
          elbFileUploadRemove
          hlmBtn
          size="icon-xs"
          class="border-background absolute -top-1 -right-1 rounded-full border-2"
        >
          <ng-icon name="lucideX" />
        </button>
      </div>
    </elb-file-upload>
  `,
})
export class FileUploadAvatarPreview {}
