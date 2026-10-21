import type { BooleanInput } from '@angular/cdk/coercion';
import {
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  output,
} from '@angular/core';
import { MglControl } from '@elbe-ui/map/control';
import { NgIcon } from '@ng-icons/core';
import { HlmButtonImports } from '@spartan-ng/helm/button';
import { HlmDropdownMenuImports } from '@spartan-ng/helm/dropdown-menu';
import type { ControlPosition } from 'maplibre-gl';
import type { ElbStyleOption } from './elb-style-option';

/**
 * `elb-style-picker` - a compact map control that opens a menu for choosing a basemap style.
 *
 * The trigger shows the current style as an icon; the style name is available to screen readers.
 *
 * @category Map Controls
 *
 * @example
 * ```html
 * <elb-style-picker
 *   position="top-right"
 *   [options]="styleOptions"
 *   [value]="styleService.styleName()"
 *   (valueChange)="styleService.setStyle($event)"
 * />
 * ```
 */
@Component({
  selector: 'elb-style-picker',
  imports: [MglControl, NgIcon, HlmButtonImports, HlmDropdownMenuImports],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <mgl-control [position]="position()">
      <button
        hlmBtn
        variant="outline"
        size="icon-sm"
        type="button"
        class="dark:bg-background dark:hover:bg-background/80"
        [hlmDropdownMenuTrigger]="menu"
        [title]="label() + ': ' + _selected().label"
        [disabled]="disabled()"
        align="end"
      >
        <ng-icon [name]="_selected().icon" />
        <span class="sr-only">{{ label() }}: {{ _selected().label }}</span>
      </button>

      <ng-template #menu>
        <hlm-dropdown-menu>
          <hlm-dropdown-menu-group>
            @for (option of options(); track option.value) {
              <button
                hlmDropdownMenuRadio
                [checked]="option.value === value()"
                [keepOpen]="false"
                (triggered)="valueChange.emit(option.value)"
              >
                <ng-icon [name]="option.icon" />
                {{ option.label }}
                <hlm-dropdown-menu-radio-indicator />
              </button>
            }
          </hlm-dropdown-menu-group>
        </hlm-dropdown-menu>
      </ng-template>
    </mgl-control>
  `,
})
export class ElbStylePicker {
  public readonly position = input<ControlPosition>();

  public readonly options = input.required<ElbStyleOption[]>();

  public readonly value = input.required<string>();

  public readonly label = input('Map style');

  public readonly disabled = input<boolean, BooleanInput>(false, { transform: booleanAttribute });

  public readonly valueChange = output<string>();

  protected readonly _selected = computed(
    () => this.options().find((option) => option.value === this.value()) ?? this.options()[0],
  );
}
