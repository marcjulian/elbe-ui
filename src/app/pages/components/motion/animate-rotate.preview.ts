import { ChangeDetectionStrategy, Component, viewChild } from '@angular/core';
import { Animate, MotionImports } from '@elbe-ui/motion';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideRotateCcw } from '@ng-icons/lucide';
import { HlmButtonImports } from '@spartan-ng/helm/button';

@Component({
  selector: 'elb-animate-rotate-preview',
  imports: [HlmButtonImports, MotionImports, NgIcon],
  providers: [provideIcons({ lucideRotateCcw })],
  template: `
    <button
      hlmBtn
      variant="ghost"
      size="icon"
      class="absolute top-2 right-2"
      aria-label="Replay"
      (click)="animate().replay()"
    >
      <ng-icon name="lucideRotateCcw" />
    </button>
    <div
      class="size-25 shrink-0 rounded-md bg-pink-500"
      [animate]="{ rotate: 360 }"
      [transition]="{ duration: 1 }"
    ></div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AnimateRotatePreview {
  readonly animate = viewChild.required(Animate);
}
