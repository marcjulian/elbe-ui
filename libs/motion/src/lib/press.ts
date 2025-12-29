import {
  afterNextRender,
  Directive,
  ElementRef,
  inject,
  input,
  type OnDestroy,
  output,
} from '@angular/core';
import { animate, type DOMKeyframesDefinition, press } from 'motion';

@Directive({ selector: '[whilePress]' })
export class Press implements OnDestroy {
  private readonly _element = inject(ElementRef);

  public readonly whilePress = input.required<DOMKeyframesDefinition>();
  public readonly onPressStart = output<PointerEvent>();
  public readonly onPress = output<PointerEvent>();
  public readonly onPressCancel = output<PointerEvent>();

  private _cancelPress?: VoidFunction;

  constructor() {
    afterNextRender(() => {
      this._cancelPress = press(this._element.nativeElement, (element, event) => {
        this.onPressStart.emit(event);
        const animation = animate(element, this.whilePress());
        return (event, { success }) => {
          if (success) {
            this.onPress.emit(event);
          } else {
            this.onPressCancel.emit(event);
          }
          // reverses playback
          animation.speed = -1;
          animation.play();
        };
      });
    });
  }

  ngOnDestroy(): void {
    this._cancelPress?.();
  }
}
