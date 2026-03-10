import { ChangeDetectionStrategy, Component } from '@angular/core';
import { BaseLayout } from '../../../layouts/base.layout';

@Component({
  selector: 'elb-map-page',
  imports: [BaseLayout],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <elb-base-layout mainClasses="gap-10 flex flex-col">
      <div>
        <h1>Map</h1>
      </div>
    </elb-base-layout>
  `,
})
export class MapPage {}
