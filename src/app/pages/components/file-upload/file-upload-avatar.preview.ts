import { Component } from '@angular/core';
import { ElbFileUploadImports } from '@elbe/ui/file-upload';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideCircleUserRound, lucideX } from '@ng-icons/lucide';

@Component({
  selector: 'elb-file-upload-avatar-preview',
  imports: [NgIcon, ElbFileUploadImports],
  providers: [provideIcons({ lucideX, lucideCircleUserRound })],
  template: `
    <elb-file-upload>
      <button elbFileUploadTrigger dragDrop types="image/*" class="size-16 rounded-full">
        <img elbFileUploadPreview elbFileUploadPreviewImage class="size-full object-cover" />
        <ng-icon elbFileUploadPlaceholder name="lucideCircleUserRound" />
      </button>
      <button elbFileUploadPreview elbFileUploadRemoveBadge class="-top-1 -right-1">
        <ng-icon name="lucideX" />
      </button>
    </elb-file-upload>
  `,
})
export class FileUploadAvatarPreview {}
