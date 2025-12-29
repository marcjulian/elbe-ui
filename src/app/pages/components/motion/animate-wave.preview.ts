import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MotionImports } from '@elbe-ui/motion';

@Component({
  selector: 'elb-animate-wave-preview',
  imports: [MotionImports],
  template: `
    <div class="flex gap-2">
      @for (item of waveItems; track item) {
        <div
          [initial]="{ scaleY: 1 }"
          [animate]="{ scaleY: 2 }"
          [transition]="{
            duration: 1,
            ease: 'easeInOut',
            delay: item * 0.3,
            repeat: infinity,
            repeatType: 'mirror',
          }"
          class="h-14 w-1.5 rounded-lg bg-blue-500 sm:h-16 sm:w-2"
        ></div>
      }
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AnimateWavePreview {
  infinity = Infinity;
  waveItems = Array.from({ length: 24 }, (_, i) => i);
}
