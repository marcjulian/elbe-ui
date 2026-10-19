import {
  Component,
  ComponentRef,
  DestroyRef,
  inject,
  input,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MglMapService } from '@elbe-ui/map';
import { VectorSourceSpecification } from 'maplibre-gl';
import { of, tap } from 'rxjs';
import { beforeEach, describe, expect, it } from 'vitest';
import { createSpyObj, type SpyObj } from '../../../testing/spy-obj';
import { MglSource } from './mgl-source';

const getMapServiceStub = () =>
  createSpyObj<MglMapService>(['removeSource', 'addSource', 'getSource'], {
    mapLoaded$: of(true),
    mapInstance: new EventTarget(),
  });
const destroyRefStub = () => createSpyObj<DestroyRef>(['onDestroy']);

@Component({
  template: '',
  hostDirectives: [{ directive: MglSource, inputs: ['id'] }],
})
export class TestSourceComponent implements OnChanges {
  public readonly sourceDirective = inject(MglSource);
  readonly testInput = input<string>();

  constructor() {
    this.sourceDirective.loadSource$
      .pipe(
        tap(() => this.sourceDirective.addSource({ type: 'vector' })),
        takeUntilDestroyed(),
      )
      .subscribe();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (!this.sourceDirective.sourceId()) {
      return;
    }
    if (changes['testInput'] && !changes['testInput'].isFirstChange()) {
      this.sourceDirective.refresh();
    }
  }
}

describe('MglSource', () => {
  let mapServiceStub: SpyObj<MglMapService>;
  let fixture: ComponentFixture<TestSourceComponent>;
  let componentRef: ComponentRef<TestSourceComponent>;
  let directive: MglSource;

  beforeEach(async () => {
    mapServiceStub = getMapServiceStub();

    await TestBed.configureTestingModule({
      imports: [TestSourceComponent, MglSource],
      providers: [
        { provide: MglMapService, useValue: mapServiceStub },
        { provide: DestroyRef, useValue: destroyRefStub },
        MglSource,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(TestSourceComponent);
    componentRef = fixture.componentRef;
    componentRef.setInput('id', 'test-id-1');
    directive = componentRef.instance.sourceDirective;
  });

  it('should remove and recreate source on update', () => {
    componentRef.setInput('id', 'test-id-1');
    componentRef.setInput('testInput', 'test value');

    directive.loadSource$.subscribe();

    fixture.detectChanges();

    componentRef.setInput('id', 'test-id-2');
    componentRef.setInput('testInput', 'new value');

    fixture.detectChanges();

    expect(mapServiceStub.removeSource).toHaveBeenCalledExactlyOnceWith('test-id-1');
    expect(mapServiceStub.addSource).toHaveBeenCalledTimes(2);
    const vector: VectorSourceSpecification = { type: 'vector' };
    expect(mapServiceStub.addSource.mock.calls[0]).toEqual(['test-id-1', vector]);
    expect(mapServiceStub.addSource.mock.calls[1]).toEqual(['test-id-2', vector]);
  });
});
