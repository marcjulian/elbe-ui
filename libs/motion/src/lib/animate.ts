import {
  afterNextRender,
  AnimationCallbackEvent,
  Directive,
  ElementRef,
  inject,
  input,
  type OnDestroy,
} from '@angular/core';
import {
  animate,
  type AnimationOptions,
  type AnimationPlaybackControlsWithThen,
  type DOMKeyframesDefinition,
} from 'motion';

@Directive({
  selector: '[animate]',
  exportAs: 'animate',
  host: {
    '(animate.enter)': 'enteringFn($event)',
    '(animate.leave)': 'leavingFn($event)',
  },
})
export class Animate implements OnDestroy {
  private readonly _element = inject(ElementRef);

  public readonly animate = input.required<DOMKeyframesDefinition>();
  public readonly transition = input<AnimationOptions>();
  public readonly initial = input<DOMKeyframesDefinition>();
  public readonly exit = input<DOMKeyframesDefinition>();

  private _animation?: AnimationPlaybackControlsWithThen;

  constructor() {
    afterNextRender(() => {
      // TODO this is rerun when @if is true
      console.log('Motion constructor');
      this._animation = animate(this._element.nativeElement, this.animate(), this.transition());
    });
  }

  ngOnDestroy(): void {
    this._animation?.cancel();
  }

  replay() {
    this._animation?.play();
  }

  protected enteringFn(event: AnimationCallbackEvent) {
    // TODO animate initial state
    event.animationComplete();
  }

  protected leavingFn(event: AnimationCallbackEvent) {
    const exit = this.exit();
    if (exit) {
      animate(event.target, exit, {
        ...this.transition(),
        onComplete: () => {
          event.animationComplete();
        },
      });
    } else {
      event.animationComplete();
    }
  }
}
