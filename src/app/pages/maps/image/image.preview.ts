import { afterNextRender, Component, computed, inject, signal } from '@angular/core';
import { MglMap, type MapImageData } from '@elbe-ui/map';
import { MglImage, svgToImage } from '@elbe-ui/map/image';
import { MglLayer } from '@elbe-ui/map/layer';
import { MglGeoJSONSource } from '@elbe-ui/map/source';
import { ElbTheme } from '@elbe/ui/theme';
import { lucideCoffee, lucideLandmark, lucideShoppingBag } from '@ng-icons/lucide';
import type { SymbolLayerSpecification } from 'maplibre-gl';
import { environment } from '../../../../environments/environment';

type MapIcon = {
  id: string;
  data: MapImageData;
};

const ICON_DEFINITIONS = [
  { id: 'lucide-coffee', icon: lucideCoffee },
  { id: 'lucide-shopping-bag', icon: lucideShoppingBag },
  { id: 'lucide-landmark', icon: lucideLandmark },
];

@Component({
  selector: 'elb-image-preview',
  imports: [MglMap, MglImage, MglGeoJSONSource, MglLayer],
  host: {
    class: 'flex aspect-square size-full overflow-hidden rounded-xl md:aspect-video',
  },
  template: `
    <mgl-map
      class="size-full"
      [mapStyle]="mapStyle()"
      [center]="center"
      [zoom]="11"
      [minZoom]="1"
      [maxZoom]="16"
    >
      @for (icon of icons(); track icon.id) {
        <mgl-image [id]="icon.id" [data]="icon.data" [options]="{ pixelRatio: 2 }" />
      }

      <mgl-geojson-source id="image-demo" [data]="places" />

      <mgl-layer id="image-demo" type="symbol" source="image-demo" [layout]="iconLayout" />
    </mgl-map>
  `,
})
export class ImagePreview {
  private readonly _theme = inject(ElbTheme);

  readonly center: [number, number] = [9.9878215, 53.55484587];

  readonly icons = signal<MapIcon[]>([]);

  readonly iconLayout: SymbolLayerSpecification['layout'] = {
    'icon-image': ['get', 'icon'],
    'icon-size': 0.75,
    'icon-allow-overlap': true,
  };

  readonly places: GeoJSON.FeatureCollection<GeoJSON.Point> = {
    type: 'FeatureCollection',
    features: [
      {
        type: 'Feature',
        geometry: { type: 'Point', coordinates: [9.9937, 53.5511] },
        properties: { name: 'Café', icon: 'lucide-coffee' },
      },
      {
        type: 'Feature',
        geometry: { type: 'Point', coordinates: [10.0015, 53.5461] },
        properties: { name: 'Shop', icon: 'lucide-shopping-bag' },
      },
      {
        type: 'Feature',
        geometry: { type: 'Point', coordinates: [9.9658, 53.557] },
        properties: { name: 'Landmark', icon: 'lucide-landmark' },
      },
    ],
  };

  constructor() {
    afterNextRender(() => {
      void Promise.all(
        ICON_DEFINITIONS.map(async (definition) => ({
          id: definition.id,
          data: await svgToImage(definition.icon, 80, 80),
        })),
      )
        .then((icons) => this.icons.set(icons))
        .catch((error: unknown) => console.error('Could not render map icons', error));
    });
  }

  mapStyle = computed(() => {
    const base = this._theme.isDark() ? environment.mapDark : environment.mapLight;
    return `${base}?key=${environment.maptilerKey}`;
  });
}
