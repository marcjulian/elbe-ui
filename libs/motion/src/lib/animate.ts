import {
  afterNextRender,
  AnimationCallbackEvent,
  Directive,
  effect,
  ElementRef,
  inject,
  Injector,
  input,
  signal,
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
  private readonly _injector = inject(Injector);

  public readonly initial = input<DOMKeyframesDefinition>();
  public readonly animate = input.required<DOMKeyframesDefinition>();
  public readonly exit = input<DOMKeyframesDefinition>();

  public readonly transition = input<AnimationOptions>();

  private _animation?: AnimationPlaybackControlsWithThen;

  private readonly _initialized = signal(false);

  constructor() {
    afterNextRender(() => {
      effect(
        () => {
          if (this._initialized()) {
            // FIXME - sometimes the animate state is shortly visibile before switching to initial state
            this._animation = animate(
              this._element.nativeElement,
              this.animate(),
              this.transition(),
            );
          }
        },
        {
          injector: this._injector,
        },
      );
    });
  }

  ngOnDestroy(): void {
    this._animation?.stop();
  }

  replay() {
    this._animation?.play();
  }

  protected enteringFn(event: AnimationCallbackEvent) {
    const initial = this.initial();
    if (initial) {
      animate(event.target, initial, {
        duration: 0,
        onComplete: () => {
          event.animationComplete();
          this._initialized.set(true);
        },
      });
    } else {
      event.animationComplete();
      this._initialized.set(true);
    }
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
