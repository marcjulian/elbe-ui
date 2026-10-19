import { Component, ComponentRef, SimpleChange, inject } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MglMapService } from '@elbe-ui/map';
import { of } from 'rxjs';
import { beforeEach, describe, expect, it } from 'vitest';
import { createSpyObj, type SpyObj } from '../../../testing/spy-obj';
import { MglLayer } from './mgl-layer';

const getMapServiceStub = () =>
  createSpyObj<MglMapService>(
    ['addLayer', 'removeLayer', 'removeSource', 'getSource', 'setLayerZoomRange'],
    {
      mapLoaded$: of(true),
      mapInstance: new (class {
        on() {}
        off() {}
        getLayer() {}
      })(),
    },
  );

@Component({
  template: '',
  hostDirectives: [
    {
      directive: MglLayer,
      inputs: ['id', 'type', 'source', 'paint', 'removeSource', 'minzoom', 'maxzoom'],
    },
  ],
})
class TestLayerHostComponent {
  readonly layer = inject(MglLayer);
}

describe('MglLayer', () => {
  let mapServiceStub: SpyObj<MglMapService>;
  let componentRef: ComponentRef<TestLayerHostComponent>;
  let fixture: ComponentFixture<TestLayerHostComponent>;
  let layer: MglLayer;

  beforeEach(async () => {
    mapServiceStub = getMapServiceStub();

    await TestBed.configureTestingModule({
      imports: [TestLayerHostComponent],
      providers: [{ provide: MglMapService, useValue: mapServiceStub }],
    }).compileComponents();

    fixture = TestBed.createComponent(TestLayerHostComponent);
    componentRef = fixture.componentRef;
    layer = fixture.componentInstance.layer;
  });

  describe('Init/Destroy tests without source', () => {
    beforeEach(() => {
      componentRef.setInput('id', 'layerId');
      componentRef.setInput('type', 'background');
      componentRef.setInput('paint', { 'background-color': 'green' });
      fixture.detectChanges();
    });

    it('should init with custom inputs', () => {
      expect(mapServiceStub.addLayer).toHaveBeenCalledWith(
        expect.objectContaining({
          layerOptions: {
            type: 'background',
            id: 'layerId',
            paint: { 'background-color': 'green' },
            source: undefined,
            metadata: undefined,
            'source-layer': undefined,
            minzoom: undefined,
            maxzoom: undefined,
            filter: undefined,
            layout: undefined,
          },
          layerEvents: expect.anything(),
        }),
        true,
        undefined,
      );
    });

    it('should remove layer on destroy', () => {
      layer.ngOnDestroy();
      expect(mapServiceStub.removeLayer).toHaveBeenCalledWith(layer.id());
    });
  });

  describe('Destroy tests with source', () => {
    beforeEach(() => {
      componentRef.setInput('id', 'layerId');
      componentRef.setInput('type', 'background');
      componentRef.setInput('paint', { 'background-color': 'green' });
      componentRef.setInput('removeSource', true);
      mapServiceStub.getSource
        .mockReturnValueOnce(undefined as never)
        .mockReturnValueOnce('layerId' as never)
        .mockReturnValueOnce({} as never);
      fixture.detectChanges();
    });

    it('should remove layer and source on destroy', () => {
      layer.ngOnDestroy();
      expect(mapServiceStub.removeLayer).toHaveBeenCalledWith(layer.id());
      expect(mapServiceStub.removeSource).toHaveBeenCalled();
    });
  });

  it('should not remove layer on destroy if not added', () => {
    layer.ngOnDestroy();
    expect(mapServiceStub.removeLayer).not.toHaveBeenCalled();
  });

  describe('Change tests', () => {
    beforeEach(() => {
      componentRef.setInput('id', 'layerId');
      componentRef.setInput('type', 'background');
      componentRef.setInput('minzoom', 10);
      fixture.detectChanges();
    });

    it('should update minzoom', () => {
      layer.ngOnChanges({
        minzoom: new SimpleChange(null, layer.minzoom(), false),
      });
      expect(mapServiceStub.setLayerZoomRange).toHaveBeenCalledWith(
        layer.id(),
        layer.minzoom(),
        undefined,
      );
    });
  });
});
