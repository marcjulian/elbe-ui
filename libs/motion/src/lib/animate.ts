import {
  afterNextRender,
  type AnimationCallbackEvent,
  computed,
  Directive,
  effect,
  ElementRef,
  inject,
  Injector,
  input,
  type OnDestroy,
} from '@angular/core';
import {
  animate,
  type AnimationOptions,
  type AnimationPlaybackControlsWithThen,
  type DOMKeyframesDefinition,
  type VariantLabels,
} from 'motion';
import type { VariantsType, VariantType } from './types';
import { resolveVariant } from './variant';

@Directive({
  selector: '[animate]',
  exportAs: 'animate',
  host: {
    '[animate.enter]': '_animateEnterClass()',
    '(animate.leave)': 'leavingFn($event)',
  },
})
export class Animate implements OnDestroy {
  private readonly _injector = inject(Injector);
  private readonly _element = inject(ElementRef);

  /** Animation start state */
  public readonly initial = input<VariantLabels | VariantType>();
  private readonly _initial = computed(() => resolveVariant(this.initial(), this.variants()));

  /** Animation end state */
  public readonly animate = input.required<VariantLabels | VariantType>();
  private readonly _animate = computed(
    () => resolveVariant(this.animate(), this.variants()) as VariantType,
  );
  /** Animation exit state when the element leaves the DOM */
  public readonly exit = input<VariantLabels | VariantType>();
  private readonly _exit = computed(() => resolveVariant(this.exit(), this.variants()));

  public readonly transition = input<AnimationOptions>();

  public readonly variants = input<VariantsType>();

  /** CSS class applied for the initial animation state. Hide element initially if initial animation is defined */
  public readonly animateEnterClass = input<string>('animate-enter');

  protected readonly _animateEnterClass = computed(() =>
    this.initial() ? this.animateEnterClass() : undefined,
  );

  private _animation?: AnimationPlaybackControlsWithThen;

  constructor() {
    afterNextRender(() => {
      if (
        !this.variants() &&
        (typeof this.initial() === 'string' ||
          typeof this.animate() === 'string' ||
          typeof this.exit() === 'string')
      ) {
        console.warn(
          '@elbe-ui/motion: Variants are not set but initial, animate or exit is a variant string.',
        );
      }

      effect(
        () => {
          const initial = this._initial();
          if (initial) {
            this.playInitial(initial, () => this.playAnimate());
          } else {
            this.playAnimate();
          }
        },
        { injector: this._injector },
      );
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
    this._animation = animate(this._element.nativeElement, this._animate(), this.transition());
  }

  ngOnDestroy(): void {
    this._animation?.stop();
  }

  replay() {
    this._animation?.play();
  }

  protected leavingFn(event: AnimationCallbackEvent) {
    const exit = this._exit();

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
