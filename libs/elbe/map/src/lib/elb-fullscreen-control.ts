import type { BooleanInput } from '@angular/cdk/coercion';
import {
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  DOCUMENT,
  inject,
  input,
} from '@angular/core';
import { MglMapService } from '@elbe-ui/map';
import { MglControl } from '@elbe-ui/map/control';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideMaximize } from '@ng-icons/lucide';
import { HlmButton } from '@spartan-ng/helm/button';
import type { ControlPosition } from 'maplibre-gl';

@Component({
  selector: 'elb-fullscreen-control',
  imports: [MglControl, HlmButton, NgIcon],
  providers: [provideIcons({ lucideMaximize })],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <mgl-control [position]="position()">
      <button
        hlmBtn
        variant="outline"
        size="icon-sm"
        type="button"
        aria-label="Toggle fullscreen"
        class="dark:bg-background dark:hover:bg-background/80"
        [disabled]="disabled()"
        (click)="toggleFullscreen()"
      >
        <ng-icon name="lucideMaximize" />
      </button>
    </mgl-control>
  `,
})
export class ElbFullscreenControl {
  private readonly _mapService = inject(MglMapService);
  private readonly _document = inject(DOCUMENT);

  public readonly position = input<ControlPosition>();
  public readonly disabled = input<boolean, BooleanInput>(false, { transform: booleanAttribute });

  toggleFullscreen() {
    const map = this._mapService.mapInstance;
    if (!map) {
      return;
    }

    if (!this._document.fullscreenElement) {
      map.getContainer().requestFullscreen();
    } else {
      this._document.exitFullscreen();
    }
  }
}
