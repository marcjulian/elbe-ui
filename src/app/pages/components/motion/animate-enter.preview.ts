import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MotionImports } from '@elbe-ui/motion';

@Component({
  selector: 'elb-animate-enter-preview',
  imports: [MotionImports],
  template: `
    <div
      class="size-25 shrink-0 rounded-full bg-fuchsia-500"
      [initial]="{ opacity: 0, scale: 0 }"
      [animate]="{ opacity: 1, scale: 1 }"
      [transition]="{
        duration: 0.4,
        scale: { type: 'spring', visualDuration: 0.4, bounce: 0.5 },
      }"
    ></div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AnimateEnterPreview {}
