import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MotionImports } from '@elbe-ui/motion';
import { HlmLabelImports } from '@spartan-ng/helm/label';

@Component({
  selector: 'elb-animate-type-preview',
  imports: [MotionImports, HlmLabelImports],
  template: `
    <div class="flex flex-col gap-5">
      <label hlmLabel>Spring</label>
      <div
        class="size-25 shrink-0 rounded-md bg-orange-500"
        [animate]="{ rotate: 90 }"
        [transition]="{ type: 'spring', repeat: infinity, bounce: 0.5 }"
      ></div>
    </div>
    <div class="flex flex-col gap-5">
      <label hlmLabel>Tween</label>
      <div
        class="size-25 shrink-0 rounded-md bg-teal-500"
        [animate]="{ rotate: 90 }"
        [transition]="{ type: 'tween', repeat: infinity, bounce: 0.5 }"
      ></div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'flex gap-20',
  },
})
export class AnimateTypePreview {
  infinity = Infinity;
}
