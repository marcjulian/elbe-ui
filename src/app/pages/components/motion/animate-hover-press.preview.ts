import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MotionImports } from '@elbe-ui/motion';

@Component({
  selector: 'elb-animate-hover-press-preview',
  imports: [MotionImports],
  template: `
    <div
      class="size-25 shrink-0 rounded-full bg-sky-500"
      [whileHover]="{ scale: 1.2 }"
      [whilePress]="{ scale: 0.8 }"
    ></div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AnimateHoverPressPreview {}
