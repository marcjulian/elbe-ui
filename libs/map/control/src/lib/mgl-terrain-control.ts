import { afterNextRender, Directive, inject, input } from '@angular/core';
import { MglMapService } from '@elbe-ui/map';
import { TerrainControl } from 'maplibre-gl';
import type { TerrainSpecification } from 'maplibre-gl';
import { MglControl } from './mgl-control';

/**
 * `mglTerrain` - a terrain control directive
 *
 * @category Directives
 *
 * @see [TerrainControl](https://maplibre.org/maplibre-gl-js/docs/API/classes/TerrainControl)
 */
@Directive({
  selector: '[mglTerrain]',
})
export class MglTerrainControl {
  private readonly mapService = inject(MglMapService);
  private readonly controlComponent = inject<MglControl<TerrainControl>>(MglControl, {
    host: true,
  });

  readonly source = input.required<string>();
  readonly exaggeration = input<number>();

  constructor() {
    afterNextRender(() => {
      this.mapService.mapCreated$.subscribe(() => {
        if (this.controlComponent.control) {
          throw new Error('Another control is already set for this control');
        }

        const options: TerrainSpecification = {
          source: this.source(),
          exaggeration: this.exaggeration() ?? 1,
        };

        this.controlComponent.control = new TerrainControl(options);

        this.mapService.addControl(
          this.controlComponent.control,
          this.controlComponent.position(),
        );
      });
    });
  }
}
