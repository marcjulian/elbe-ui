import type { BooleanInput } from '@angular/cdk/coercion';
import {
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  DOCUMENT,
  inject,
  input,
} from '@angular/core';
import { ControlComponent, MapService } from '@maplibre/ngx-maplibre-gl';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideMaximize } from '@ng-icons/lucide';
import { HlmButton } from '@spartan-ng/helm/button';
import type { ControlPosition } from 'maplibre-gl';

@Component({
  selector: 'elb-fullscreen-control',
  imports: [ControlComponent, HlmButton, NgIcon],
  providers: [provideIcons({ lucideMaximize })],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <mgl-control>
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
  private mapService = inject(MapService);
  private document = inject(DOCUMENT);

  public readonly position = input<ControlPosition>();
  public readonly disabled = input<boolean, BooleanInput>(false, { transform: booleanAttribute });

  toggleFullscreen() {
    const map = this.mapService.mapInstance;
    if (!this.document.fullscreenElement) {
      map.getContainer().requestFullscreen();
    } else {
      this.document.exitFullscreen();
    }
  }
}
