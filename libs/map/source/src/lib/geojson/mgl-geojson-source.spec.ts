import { Component, signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MglMapService } from '@elbe-ui/map';
import { of } from 'rxjs';
import { beforeEach, describe, expect, it } from 'vitest';
import { createSpyObj, type SpyObj } from '../../../../testing/spy-obj';
import { MglGeoJSONSource } from './mgl-geojson-source';

const getMapServiceStub = () =>
  createSpyObj<MglMapService>(['addSource', 'removeSource'], {
    mapLoaded$: of(true),
    mapInstance: new (class {
      on() {}
      off() {}
      getLayer() {}
    })(),
  });

@Component({
  template: `
    @if (show()) {
      <mgl-geojson-source id="123"></mgl-geojson-source>
    }
  `,
  imports: [MglGeoJSONSource],
})
class GeoJSONSourceTestComponent {
  readonly show = signal<boolean>(true);

  public toggle() {
    this.show.set(!this.show());
  }
}

describe('MglGeoJSONSource', () => {
  let mapServiceStub: SpyObj<MglMapService>;
  let component: GeoJSONSourceTestComponent;
  let fixture: ComponentFixture<GeoJSONSourceTestComponent>;

  beforeEach(async () => {
    mapServiceStub = getMapServiceStub();

    await TestBed.configureTestingModule({
      imports: [GeoJSONSourceTestComponent],
      providers: [{ provide: MglMapService, useValue: mapServiceStub }],
    })
      .overrideComponent(GeoJSONSourceTestComponent, {
        set: {
          providers: [{ provide: MglMapService, useValue: mapServiceStub }],
        },
      })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GeoJSONSourceTestComponent);
    component = fixture.componentInstance;
  });

  describe('Init/Destroy tests', () => {
    beforeEach(() => {
      fixture.detectChanges();
    });

    it('should call add source when init', () => {
      expect(mapServiceStub.addSource).toHaveBeenCalled();
    });

    it('should remove source on destroy', () => {
      component.toggle();
      fixture.detectChanges();
      expect(mapServiceStub.removeSource).toHaveBeenCalled();
    });
  });
});
