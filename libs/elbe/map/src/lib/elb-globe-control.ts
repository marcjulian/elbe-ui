import type { BooleanInput } from '@angular/cdk/coercion';
import {
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
  signal,
} from '@angular/core';
import { MglMapService } from '@elbe-ui/map';
import { MglControl } from '@elbe-ui/map/control';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideGlobe } from '@ng-icons/lucide';
import { HlmButton } from '@spartan-ng/helm/button';
import type { ControlPosition } from 'maplibre-gl';

@Component({
  selector: 'elb-globe-control',
  imports: [MglControl, HlmButton, NgIcon],
  providers: [provideIcons({ lucideGlobe })],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <mgl-control [position]="position()">
      <button
        hlmBtn
        variant="outline"
        size="icon-sm"
        type="button"
        aria-label="Toggle globe view"
        class="dark:bg-background dark:hover:bg-background/80 data-active:text-primary"
        [attr.data-active]="_active() ? 'true' : null"
        [disabled]="disabled()"
        (click)="toggleGlobeView()"
      >
        <ng-icon name="lucideGlobe" />
      </button>
    </mgl-control>
  `,
})
export class ElbGlobeControl {
  private readonly _mapService = inject(MglMapService);

  protected readonly _active = signal(false);

  public readonly position = input<ControlPosition>();

  public readonly disabled = input<boolean, BooleanInput>(false, { transform: booleanAttribute });

  toggleGlobeView() {
    const map = this._mapService.mapInstance;
    if (!map) {
      return;
    }

    const currentProjection = map.getProjection()?.type;

    if (currentProjection === 'globe') {
      map.setProjection({ type: 'mercator' });
      this._active.set(false);
    } else {
      map.setProjection({ type: 'globe' });
      this._active.set(true);
    }
  }
}
