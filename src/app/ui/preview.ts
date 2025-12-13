import { computed, Directive, input } from '@angular/core';
import { hlm } from '@spartan-ng/helm/utils';
import { ClassValue } from 'clsx';

@Directive({
  selector: '[elbPreview],elb-preview',
  host: {
    'data-slot': 'preview',
    '[class]': '_computedClass()',
  },
})
export class Preview {
  public readonly _userClass = input<ClassValue>('', {
    alias: 'class',
  });
  protected readonly _computedClass = computed(() =>
    hlm(
      'border-border relative mt-4 flex min-h-60 items-center justify-center rounded-md border p-6 md:p-10',
      this._userClass(),
    ),
  );
}
