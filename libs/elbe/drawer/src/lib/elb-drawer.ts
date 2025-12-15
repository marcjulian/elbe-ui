import { BooleanInput } from '@angular/cdk/coercion';
import {
  afterNextRender,
  booleanAttribute,
  Directive,
  DOCUMENT,
  effect,
  ElementRef,
  inject,
  Injector,
  input,
  linkedSignal,
  output,
  untracked,
} from '@angular/core';
import { CupertinoPane } from 'cupertino-pane';
import { injectElbDrawerConfig, type DrawerOptions } from './elb-drawer.token';

@Directive({
  selector: '[elbDrawer],elb-drawer',
  exportAs: 'elbDrawer',
  host: {
    'data-slot': 'drawer',
  },
})
export class ElbDrawer {
  private readonly _injector = inject(Injector);
  private readonly _elementRef = inject<ElementRef<HTMLElement>>(ElementRef);
  private readonly _document = inject(DOCUMENT);

  private readonly _config = injectElbDrawerConfig();

  public readonly options = input<DrawerOptions>();

  public readonly state = input<'open' | 'closed'>('closed');
  private readonly _state = linkedSignal(this.state);

  public readonly animate = input<boolean, BooleanInput>(true, {
    transform: booleanAttribute,
  });

  public readonly stateChanged = output<'open' | 'closed'>();

  private cupertino?: CupertinoPane;

  constructor() {
    afterNextRender(() => {
      this.cupertino = new CupertinoPane(this._elementRef.nativeElement, {
        events: {
          onDidPresent: () => {
            // prevent body scroll when drawer is open
            this._document.body.style.overflowY = 'hidden';
          },
          onBackdropTap: () => this._close(),
          onWillDismiss: () => this.stateChanged.emit('closed'),
          onDidDismiss: () => {
            this._state.set('closed');

            // restore body scroll when drawer is closed
            this._document.body.style.overflowY = '';
            this._document.body.style.overscrollBehaviorY = '';
          },
        },
        ...this._config.options,
        ...this.options(),
      });

      // keep effect in afterNextRender to ensure open can be set as default state
      effect(
        () => {
          const state = this._state();

          if (state === 'open') {
            untracked(() => this._open());
          }
          if (state === 'closed') {
            untracked(() => this._close());
          }
        },
        { injector: this._injector },
      );
    });
  }

  async ngOnDestroy() {
    await this.destroy();
  }

  open() {
    this._state.set('open');
  }

  close() {
    this._state.set('closed');
  }

  private async _open() {
    await this.cupertino?.present({ animate: this.animate() });
    this.stateChanged.emit('open');
  }

  private async _close() {
    if (!this.cupertino?.isPanePresented()) return;

    await this.cupertino?.destroy({ animate: this.animate() });
    this.stateChanged.emit('closed');
  }

  private async destroy() {
    if (!this.cupertino?.isPanePresented()) return;

    await this.cupertino?.destroy({ animate: this.animate() });
  }
}
