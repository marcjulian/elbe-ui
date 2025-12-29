import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { MotionImports } from '@elbe-ui/motion';
import { HlmButtonImports } from '@spartan-ng/helm/button';

@Component({
  selector: 'elb-animate-enter-exit-preview',
  imports: [HlmButtonImports, MotionImports],
  template: `
    @if (isVisible()) {
      <div
        id="box"
        class="bg-primary size-25 shrink-0 rounded-md"
        [initial]="{ opacity: 0, scale: 0 }"
        [animate]="{ opacity: 1, scale: 1 }"
        [exit]="{ opacity: 0, scale: 0 }"
      ></div>
    }
    <button hlmBtn class="absolute bottom-4 left-1/2 -translate-x-1/2 w-25" [whilePress]="{ y: 1 }" (click)="toggle()">
      {{ isVisible() ? 'Hide' : 'Show' }}
    </button>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AnimateEnterExitPreview {
  public isVisible = signal(true);

  toggle() {
    this.isVisible.set(!this.isVisible());
  }
}
