import { ChangeDetectionStrategy, Component, viewChild } from '@angular/core';
import { Count, MotionImports } from '@elbe-ui/motion';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideRotateCcw } from '@ng-icons/lucide';
import { HlmButtonImports } from '@spartan-ng/helm/button';

@Component({
  selector: 'elb-animate-count-preview',
  imports: [HlmButtonImports, MotionImports, NgIcon],
  providers: [provideIcons({ lucideRotateCcw })],
  template: `
    <button
      hlmBtn
      variant="ghost"
      size="icon"
      class="absolute top-2 right-2"
      aria-label="Replay"
      (click)="count().toggle()"
    >
      <ng-icon name="lucideRotateCcw" />
    </button>
    <div class="text-6xl text-orange-500" count from="0" to="1000"></div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AnimateCountPreview {
  readonly count = viewChild.required(Count);
}
