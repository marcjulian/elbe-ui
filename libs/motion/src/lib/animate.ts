import {
  afterNextRender,
  AnimationCallbackEvent,
  computed,
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
    '[animate.enter]': '_animateEnterClass()',
    '(animate.leave)': 'leavingFn($event)',
  },
})
export class Animate implements OnDestroy {
  private readonly _element = inject(ElementRef);

  public readonly initial = input<DOMKeyframesDefinition>();
  public readonly animate = input.required<DOMKeyframesDefinition>();
  public readonly exit = input<DOMKeyframesDefinition>();

  // hide element initially if initial animation is defined
  protected readonly _animateEnterClass = computed(() =>
    this.initial() ? 'opacity-0' : undefined,
  );

  public readonly transition = input<AnimationOptions>();

  private _animation?: AnimationPlaybackControlsWithThen;

  constructor() {
    afterNextRender(() => {
      const initial = this.initial();
      if (initial) {
        this.playInitial(initial, () => this.playAnimate());
      } else {
        this.playAnimate();
      }
    });
  }

  private playInitial(initial: DOMKeyframesDefinition, onComplete: () => void) {
    this._animation = animate(this._element.nativeElement, initial, {
      // instantly apply initial styles
      duration: 0,
      onComplete,
    });
  }

  private playAnimate() {
    this._animation = animate(this._element.nativeElement, this.animate(), this.transition());
  }

  ngOnDestroy(): void {
    this._animation?.stop();
  }

  replay() {
    this._animation?.play();
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
