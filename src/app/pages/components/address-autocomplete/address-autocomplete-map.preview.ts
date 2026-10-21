import { Component, signal, viewChild } from '@angular/core';
import { MglMap } from '@elbe-ui/map';
import { MglControl } from '@elbe-ui/map/control';
import { Address, ElbAddressAutocompleteImports } from '@elbe/ui/address-autocomplete';
import { ElbMapImports } from '@elbe/ui/map';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideArrowUpFromDot, lucidePlane } from '@ng-icons/lucide';
import { HlmToggleGroupImports } from '@spartan-ng/helm/toggle-group';
import { injectMapStyle } from '../../../map-style';

@Component({
  selector: 'elb-address-autocomplete-map-preview',
  imports: [
    MglMap,
    MglControl,
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
      [mapStyle]="_mapStyle()"
      [center]="[9.9278215, 53.5584587]"
      [zoom]="8"
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

      <elb-navigation-control position="top-right" />

      <mgl-control position="bottom-left">
        <a href="https://www.maptiler.com">
          <img src="https://api.maptiler.com/resources/logo.svg" alt="MapTiler logo" />
        </a>
      </mgl-control>
    </mgl-map>
  `,
})
export class AddressAutocompleteMapPreview {
  protected readonly _mapStyle = injectMapStyle();

  private readonly map = viewChild.required(MglMap);

  zoomType = signal<'jump' | 'fly'>('jump');

  zoomToAddress(address: Address | null) {
    if (!address) return;

    const map = this.map().mapInstance;
    if (!map) return;

    if (this.zoomType() === 'fly') {
      map.flyTo({
        center: [address.lng, address.lat],
        zoom: 12,
      });
    } else {
      map.jumpTo({
        center: [address.lng, address.lat],
        zoom: 12,
      });
    }
  }
}
