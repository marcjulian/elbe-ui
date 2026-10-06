import { Component } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { simpleGithub } from '@ng-icons/simple-icons';
import { HlmButtonImports } from '@spartan-ng/helm/button';
import { config } from '../../../config';
import { H2, H3 } from '../../../ui/heading';
import { Preview } from '../../../ui/preview';
import { FileUploadAvatarPreview } from './file-upload-avatar.preview';
import { FileUploadDropzoneAndTriggerPreview } from './file-upload-dropzone-and-trigger.preview';
import { FileUploadDropzoneOnlyPreview } from './file-upload-dropzone-only.preview';
import { FileUploadDropzonePreview } from './file-upload-dropzone.preview';
import { FileUploadFilePreview } from './file-upload-file.preview';
import { FileUploadMultiAttachmentPreview } from './file-upload-multi-attachment.preview';
import { FileUploadMultiImagesPreview } from './file-upload-multi-images.preview';
import { FileUploadMultiPreview } from './file-upload-multi.preview';
import { FileUploadPreview } from './file-upload.preview';

@Component({
  selector: 'app-file-upload-page',
  imports: [
    Preview,
    NgIcon,
    HlmButtonImports,
    H2,
    H3,
    FileUploadPreview,
    FileUploadAvatarPreview,
    FileUploadDropzonePreview,
    FileUploadDropzoneAndTriggerPreview,
    FileUploadDropzoneOnlyPreview,
    FileUploadFilePreview,
    FileUploadMultiPreview,
    FileUploadMultiImagesPreview,
    FileUploadMultiAttachmentPreview,
  ],
  providers: [provideIcons({ simpleGithub })],
  template: `
    <div class="flex flex-col gap-2">
      <div class="flex justify-between">
        <h1 class="text-3xl font-semibold">File Upload</h1>
        <a
          hlmBtn
          variant="outline"
          size="sm"
          href="${config.github}/tree/main/libs/elbe/file-upload/src/lib"
          target="_blank"
          rel="noopener noreferrer"
        >
          Open in
          <ng-icon name="simpleGithub" />
        </a>
      </div>
      <p class="text-muted-foreground max-w-md text-balance">
        File upload component built with Angular Primitives. Drag and drop, multi-file selection,
        and image previews.
      </p>
    </div>

    <div elbPreview>
      <elb-file-upload-preview />
    </div>

    <elb-h2 id="about"> About </elb-h2>
    <div class="typeset mt-2">
      <p>
        This component uses Angular Primitives
        <a
          href="https://angularprimitives.com/primitives/file-upload"
          target="_blank"
          rel="noopener noreferrer"
        >
          File Upload
        </a>
        directive for trigger and dropzone.
      </p>

      <p>
        You need to setup
        <a
          href="https://angularprimitives.com/getting-started/get-started"
          target="_blank"
          rel="noopener noreferrer"
          >Angular Primitives</a
        >
        in your project. Install
        <code>npm install ng-primitives</code>.
      </p>
    </div>

    <elb-h2 id="examples"> Examples </elb-h2>

    <div class="flex items-baseline justify-between gap-6">
      <elb-h3 id="avatar"> Avatar </elb-h3>
      <a
        hlmBtn
        variant="outline"
        size="sm"
        href="${config.github}/tree/main/src/app/pages/components/file-upload/file-upload-avatar.preview.ts"
        target="_blank"
        rel="noopener noreferrer"
      >
        Open in
        <ng-icon name="simpleGithub" />
      </a>
    </div>
    <div elbPreview>
      <elb-file-upload-avatar-preview />
    </div>

    <div class="flex items-baseline justify-between gap-6">
      <elb-h3 id="dropzone"> Dropzone </elb-h3>
      <a
        hlmBtn
        variant="outline"
        size="sm"
        href="${config.github}/tree/main/src/app/pages/components/file-upload/file-upload-dropzone.preview.ts"
        target="_blank"
        rel="noopener noreferrer"
      >
        Open in
        <ng-icon name="simpleGithub" />
      </a>
    </div>
    <div elbPreview>
      <elb-file-upload-dropzone-preview />
    </div>

    <div class="flex items-baseline justify-between gap-6">
      <elb-h3 id="dropzone-button-trigger"> Dropzone + Button Trigger </elb-h3>
      <a
        hlmBtn
        variant="outline"
        size="sm"
        href="${config.github}/tree/main/src/app/pages/components/file-upload/file-upload-dropzone-and-trigger.preview.ts"
        target="_blank"
        rel="noopener noreferrer"
      >
        Open in
        <ng-icon name="simpleGithub" />
      </a>
    </div>
    <div elbPreview>
      <elb-file-upload-dropzone-and-trigger-preview />
    </div>

    <div class="flex items-baseline justify-between gap-6">
      <elb-h3 id="dropzone-only"> Dropzone Only </elb-h3>
      <a
        hlmBtn
        variant="outline"
        size="sm"
        href="${config.github}/tree/main/src/app/pages/components/file-upload/file-upload-dropzone-only.preview.ts"
        target="_blank"
        rel="noopener noreferrer"
      >
        Open in
        <ng-icon name="simpleGithub" />
      </a>
    </div>
    <div elbPreview>
      <elb-file-upload-dropzone-only-preview />
    </div>

    <div class="flex items-baseline justify-between gap-6">
      <elb-h3 id="file"> File Upload </elb-h3>
      <a
        hlmBtn
        variant="outline"
        size="sm"
        href="${config.github}/tree/main/src/app/pages/components/file-upload/file-upload-file.preview.ts"
        target="_blank"
        rel="noopener noreferrer"
      >
        Open in
        <ng-icon name="simpleGithub" />
      </a>
    </div>
    <div elbPreview>
      <elb-file-upload-file-preview />
    </div>

    <div class="flex items-baseline justify-between gap-6">
      <elb-h3 id="attachment-list"> Attachment List </elb-h3>
      <a
        hlmBtn
        variant="outline"
        size="sm"
        href="${config.github}/tree/main/src/app/pages/components/file-upload/file-upload-multi.preview.ts"
        target="_blank"
        rel="noopener noreferrer"
      >
        Open in
        <ng-icon name="simpleGithub" />
      </a>
    </div>
    <div elbPreview>
      <elb-file-upload-multi-preview />
    </div>

    <div class="flex items-baseline justify-between gap-6">
      <elb-h3 id="image-grid"> Image Grid </elb-h3>
      <a
        hlmBtn
        variant="outline"
        size="sm"
        href="${config.github}/tree/main/src/app/pages/components/file-upload/file-upload-multi-images.preview.ts"
        target="_blank"
        rel="noopener noreferrer"
      >
        Open in
        <ng-icon name="simpleGithub" />
      </a>
    </div>
    <div elbPreview>
      <elb-file-upload-multi-images-preview />
    </div>

    <div class="flex items-baseline justify-between gap-6">
      <elb-h3 id="attachment-grid"> Attachment Grid </elb-h3>
      <a
        hlmBtn
        variant="outline"
        size="sm"
        href="${config.github}/tree/main/src/app/pages/components/file-upload/file-upload-multi-attachment.preview.ts"
        target="_blank"
        rel="noopener noreferrer"
      >
        Open in
        <ng-icon name="simpleGithub" />
      </a>
    </div>
    <div elbPreview>
      <elb-file-upload-multi-attachment-preview />
    </div>
  `,
})
export class FileUploadPage {}
