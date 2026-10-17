import { Component, computed, inject } from '@angular/core';
import { MglMap } from '@elbe-ui/map';
import { MglMarker } from '@elbe-ui/map/marker';
import { MglPopup, provideMglPopupConfig } from '@elbe-ui/map/popup';
import { ElbTheme } from '@elbe/ui/theme';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'elb-popup-preview',
  imports: [MglMap, MglMarker, MglPopup],
  providers: [
    provideMglPopupConfig({
      closeButton: false,
      offset: 16,
      className:
        'popup-tip:invisible max-w-none! popup-content:rounded-xl popup-content:overflow-hidden popup-content:p-0 popup-content:shadow popup-content:ring-1 popup-content:ring-gray-950/5',
    }),
  ],
  host: {
    class: 'flex aspect-square md:aspect-video size-full rounded-xl overflow-hidden',
  },
  template: `
    <mgl-map
      class="size-full"
      [mapStyle]="mapStyle()"
      [center]="center"
      [zoom]="12"
      [minZoom]="1"
      [maxZoom]="18"
    >
      <mgl-marker
        [lngLat]="center"
        #marker="mglMarker"
        class="border-border bg-primary text-primary-foreground rounded-full border px-2.5 py-1 text-xs font-medium shadow-md"
      >
        Hamburg
      </mgl-marker>

      <mgl-popup [marker]="marker" class="flex flex-col gap-1 p-4">
        <p class="text-sm font-medium">Hello from Hamburg 👋</p>
        <p class="text-muted-foreground text-xs">Anchored to the marker.</p>
      </mgl-popup>
    </mgl-map>
  `,
})
export class PopupPreview {
  private readonly _theme = inject(ElbTheme);

  readonly center: [number, number] = [9.9278215, 53.5584587];

  mapStyle = computed(() => {
    const base = this._theme.isDark() ? environment.mapDark : environment.mapLight;
    return `${base}?key=${environment.maptilerKey}`;
  });
}
