import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { MotionImports, VariantsType } from '@elbe-ui/motion';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideCheck, lucideCopy } from '@ng-icons/lucide';
import { HlmButtonImports } from '@spartan-ng/helm/button';

@Component({
  selector: 'elb-animate-copy-button',
  imports: [HlmButtonImports, NgIcon, MotionImports],
  providers: [provideIcons({ lucideCheck, lucideCopy })],
  template: `
    <button
      hlmBtn
      variant="outline"
      size="icon"
      class="dark:hover:bg-black/50"
      (click)="copy()"
      aria-label="Copy code"
    >
      <!-- TODO wait for one animation to finish before starting the other between elements -->
      @if (copied()) {
        <ng-icon
          [variants]="variants"
          initial="hidden"
          animate="visible"
          exit="hidden"
          name="lucideCheck"
          class="text-green-500"
        />
      } @else {
        <ng-icon
          [variants]="variants"
          initial="hidden"
          animate="visible"
          exit="hidden"
          name="lucideCopy"
        />
      }
    </button>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AnimateCopyButtonPreview {
  variants: VariantsType = {
    hidden: { opacity: 0, scale: 0.5 },
    visible: { opacity: 1, scale: 1 },
  };

  readonly copied = signal(false);

  copy() {
    this.copied.set(true);
    setTimeout(() => this.copied.set(false), 2000);
  }
}
