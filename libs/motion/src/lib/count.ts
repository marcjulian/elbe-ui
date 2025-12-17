import type { NumberInput } from '@angular/cdk/coercion';
import {
  afterNextRender,
  Directive,
  ElementRef,
  inject,
  input,
  numberAttribute,
  type OnDestroy,
} from '@angular/core';
import { animate, type AnimationPlaybackControlsWithThen, type Easing } from 'motion';

@Directive({ selector: '[count]', exportAs: 'count' })
export class Count implements OnDestroy {
  private readonly _element = inject(ElementRef);

  public readonly from = input<number, NumberInput>(0, { transform: numberAttribute });
  public readonly to = input<number, NumberInput>(100, { transform: numberAttribute });
  public readonly duration = input<number, NumberInput>(2, { transform: numberAttribute });
  public readonly ease = input<Easing | Easing[] | undefined>('circOut');

  private _animation?: AnimationPlaybackControlsWithThen;

  constructor() {
    afterNextRender(() => {
      this._animation = animate(this.from(), this.to(), {
        duration: this.duration(),
        ease: this.ease(),
        onUpdate: (latest) => (this._element.nativeElement.innerHTML = Math.round(latest)),
      });
    });
  }

  ngOnDestroy(): void {
    this._animation?.cancel();
  }

  replay() {
    this._animation?.play();
  }

  reverse() {
    const animation = this._animation;
    if (animation) {
      animation.speed = -1;
      animation.play();
    }
  }

  toggle() {
    const animation = this._animation;
    if (animation) {
      const speed = animation.speed;
      animation.speed = speed === 1 ? -1 : 1;
      animation.play();
    }
  }
}
