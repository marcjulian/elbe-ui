import { Directive, OnChanges, SimpleChanges, inject, input } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import type { VideoSource, VideoSourceSpecification } from 'maplibre-gl';
import { tap } from 'rxjs';
import { MglSource } from './mgl-source';

/**
 * `mgl-video-source` - a video source
 * @see [video](https://maplibre.org/maplibre-style-spec/sources/#video)
 *
 * @category Directives
 */
@Directive({
  selector: '[mglVideoSource], mgl-video-source',
  hostDirectives: [{ directive: MglSource, inputs: ['id'] }],
})
export class MglVideoSource implements OnChanges {
  private readonly sourceDirective = inject(MglSource);

  /** Dynamic input */
  readonly urls = input.required<VideoSourceSpecification['urls']>();

  /** Dynamic input */
  readonly coordinates = input.required<VideoSourceSpecification['coordinates']>();

  constructor() {
    this.sourceDirective.loadSource$
      .pipe(
        tap(() => this.addSource()),
        takeUntilDestroyed(),
      )
      .subscribe();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (!this.sourceDirective.sourceId()) {
      return;
    }

    if (changes['urls'] && !changes['urls'].isFirstChange()) {
      this.sourceDirective.refresh();
    } else if (changes['coordinates'] && !changes['coordinates'].isFirstChange()) {
      const source = this.sourceDirective.getSource<VideoSource>();
      if (source === undefined) {
        return;
      }
      source.setCoordinates(changes['coordinates'].currentValue);
    }
  }

  addSource() {
    const source: VideoSourceSpecification = {
      type: 'video',
      urls: this.urls(),
      coordinates: this.coordinates(),
    };
    this.sourceDirective.addSource(source);
  }
}
