import type { BooleanInput } from '@angular/cdk/coercion';
import { booleanAttribute, ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { MglControl } from '@elbe-ui/map/control';
import { NgIcon } from '@ng-icons/core';
import { HlmButtonImports } from '@spartan-ng/helm/button';
import { HlmButtonGroupImports } from '@spartan-ng/helm/button-group';
import type { ControlPosition } from 'maplibre-gl';

export interface ElbStyleSwitcherOption {
  value: string;
  label: string;
  icon: string;
}

/**
 * `elb-style-switcher` - a segmented map control for switching basemap styles.
 *
 * @category Map Controls
 *
 * @example
 * ```html
 * <elb-style-switcher
 *   position="top-right"
 *   orientation="vertical"
 *   [options]="styleOptions"
 *   [value]="styleService.styleName()"
 *   (valueChange)="styleService.setStyle($event)"
 * />
 * ```
 */
@Component({
  selector: 'elb-style-switcher',
  imports: [MglControl, NgIcon, HlmButtonImports, HlmButtonGroupImports],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <mgl-control [position]="position()">
      <hlm-button-group [orientation]="orientation()" [attr.aria-label]="label()" class="h-fit">
        @for (option of options(); track option.value) {
          <button
            hlmBtn
            variant="outline"
            size="icon-sm"
            type="button"
            [attr.aria-label]="option.label"
            [attr.aria-pressed]="option.value === value()"
            [attr.data-active]="option.value === value() ? 'true' : null"
            [title]="option.label"
            class="dark:bg-background dark:hover:bg-background/80 data-active:text-primary data-active:hover:text-primary"
            [disabled]="disabled()"
            (click)="valueChange.emit(option.value)"
          >
            <ng-icon [name]="option.icon" />
          </button>
        }
      </hlm-button-group>
    </mgl-control>
  `,
})
export class ElbStyleSwitcher {
  public readonly position = input<ControlPosition>();

  public readonly orientation = input<'horizontal' | 'vertical'>('vertical');

  public readonly options = input.required<ElbStyleSwitcherOption[]>();

  public readonly value = input.required<string>();

  public readonly label = input('Map style');

  public readonly disabled = input<boolean, BooleanInput>(false, { transform: booleanAttribute });

  public readonly valueChange = output<string>();
}
