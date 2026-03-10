import { ChangeDetectionStrategy, Component } from '@angular/core';
import { BaseLayout } from '../../../layouts/base.layout';

@Component({
  selector: 'elb-gallery-page',
  imports: [BaseLayout],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <elb-base-layout mainClasses="gap-10 flex flex-col">
      <div>
        <h1>Gallery</h1>
      </div>
    </elb-base-layout>
  `,
})
export class GalleryPage {}
