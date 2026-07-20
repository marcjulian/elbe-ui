import { Component, computed, inject, signal, viewChild } from '@angular/core';
import { Address, ElbAddressAutocompleteImports } from '@elbe/ui/address-autocomplete';
import { ElbMapImports } from '@elbe/ui/map';
import { MapComponent, NgxMapLibreGLModule } from '@maplibre/ngx-maplibre-gl';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideArrowUpFromDot, lucidePlane } from '@ng-icons/lucide';
import { HlmToggleGroupImports } from '@spartan-ng/helm/toggle-group';
import { environment } from '../../../../environments/environment';
import { ThemeService } from '../../../tools/theme';

const MapStyles: Record<string, string> = {
  light: 'streets-v4',
  dark: 'streets-v4-dark',
};

@Component({
  selector: 'elb-address-autocomplete-map-preview',
  imports: [
    NgxMapLibreGLModule,
    ElbAddressAutocompleteImports,
    ElbMapImports,
    HlmToggleGroupImports,
    NgIcon,
  ],
  providers: [provideIcons({ lucideArrowUpFromDot, lucidePlane })],
  host: {
    class: 'flex aspect-square md:aspect-video size-full rounded-xl overflow-hidden relative',
  },
  template: `
    <mgl-map
      class="size-full"
      [mapStyle]="mapStyle()"
      [center]="[9.9278215, 53.5584587]"
      [zoom]="[8]"
      [minZoom]="2"
      [maxZoom]="14"
    >
      <mgl-control position="top-left">
        <div class="flex items-center gap-2">
          <elb-address-autocomplete class="block w-80" (valueChange)="zoomToAddress($event)" />

          <hlm-toggle-group [(value)]="zoomType" class="bg-background">
            <button hlmToggleGroupItem value="jump" aria-label="Jump to location">
              <ng-icon name="lucideArrowUpFromDot" />
            </button>
            <button hlmToggleGroupItem value="fly" aria-label="Fly to location">
              <ng-icon name="lucidePlane" />
            </button>
          </hlm-toggle-group>
        </div>
      </mgl-control>

      <mgl-control position="top-right">
        <elb-navigation-control />
      </mgl-control>

      <mgl-control position="bottom-left">
        <a href="https://www.maptiler.com">
          <img src="https://api.maptiler.com/resources/logo.svg" alt="MapTiler logo" />
        </a>
      </mgl-control>
    </mgl-map>
  `,
})
export class AddressAutocompleteMapPreview {
  private readonly _theme = inject(ThemeService);

  private readonly map = viewChild.required(MapComponent);

  zoomType = signal<'jump' | 'fly'>('jump');

  mapStyle = computed(
    () =>
      `https://api.maptiler.com/maps/${MapStyles[this._theme.theme() || 'light']}/style.json?key=${environment.maptilerKey}`,
  );

  zoomToAddress(address: Address | null) {
    if (!address) return;

    if (this.zoomType() === 'fly') {
      this.map().mapInstance.flyTo({
        center: [address.lng, address.lat],
        zoom: 12,
      });
    } else {
      this.map().mapInstance.jumpTo({
        center: [address.lng, address.lat],
        zoom: 12,
      });
    }
  }
}
