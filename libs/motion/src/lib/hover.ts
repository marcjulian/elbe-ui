import {
  afterNextRender,
  Directive,
  ElementRef,
  inject,
  input,
  OnDestroy,
  output,
} from '@angular/core';
import { animate, type DOMKeyframesDefinition, hover } from 'motion';

@Directive({ selector: '[whileHover]' })
export class Hover implements OnDestroy {
  private readonly _element = inject(ElementRef);

  public readonly whileHover = input.required<DOMKeyframesDefinition>();

  public readonly onHoverStart = output<PointerEvent>();
  public readonly onHoverEnd = output<PointerEvent>();

  private _cancelHover?: VoidFunction;

  constructor() {
    afterNextRender(() => {
      this._cancelHover = hover(this._element.nativeElement, (element, event) => {
        this.onHoverStart.emit(event);
        const animation = animate(element, this.whileHover());
        return (event) => {
          this.onHoverEnd.emit(event);
          // reverses playback
          animation.speed = -1;
          animation.play();
        };
      });
    });
  }

  ngOnDestroy(): void {
    this._cancelHover?.();
  }
}
