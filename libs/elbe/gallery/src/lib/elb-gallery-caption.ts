import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { hlm } from '@spartan-ng/helm/utils';
import type { ClassValue } from 'clsx';

@Component({
  selector: 'elb-gallery-caption',
  host: {
    class: 'hidden',
  },
  template: `
    <div [class]="_computedClass()" data-slot="gallery-caption">
      <ng-content />
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ElbGalleryCaption {
  public readonly _userClass = input<ClassValue>('', {
    alias: 'class',
  });
  protected readonly _computedClass = computed(() =>
    hlm(
      'bg-gallery/80 text-gallery-foreground absolute bottom-10 left-1/2 w-[calc(100%---spacing(14))] -translate-x-1/2 rounded-sm p-2 sm:max-w-xs',
      this._userClass(),
    ),
  );
}
