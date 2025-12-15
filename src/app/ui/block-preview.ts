import { BooleanInput } from '@angular/cdk/coercion';
import {
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
} from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { hlm } from '@spartan-ng/helm/utils';
import { ClassValue } from 'clsx';

@Component({
  selector: 'elb-block-preview',
  template: `
    <!-- TODO add images -->
    @if (showImagesOnMobile()) {
      <img
        [src]="'/assets/blocks/' + name() + '.png'"
        [alt]="name()"
        class="border-border flex rounded-xl border md:hidden dark:hidden"
      />
      <img
        [src]="'/assets/blocks/' + name() + '-dark.png'"
        [alt]="name()"
        class="border-border flex rounded-xl border not-dark:hidden md:hidden"
      />
    }

    <div
      class="bg-background relative aspect-auto h-128 overflow-hidden rounded-lg border md:block md:aspect-auto md:h-192 md:rounded-xl"
      [class.hidden]="showImagesOnMobile()"
    >
      <iframe
        [src]="_iframeSrc()"
        class="bg-background no-scrollbar relative z-20 h-full w-full"
        #iframe
      ></iframe>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    'data-slot': 'block-preview',
    '[class]': '_computedClass()',
  },
})
export class BlockPreview {
  private readonly _sanitizer = inject(DomSanitizer);
  public readonly name = input.required<string>();
  public readonly showImagesOnMobile = input<boolean, BooleanInput>(true, {
    transform: booleanAttribute,
  });
  protected readonly _iframeSrc = computed(() =>
    this._sanitizer.bypassSecurityTrustResourceUrl(`/preview/${this.name()}`),
  );

  public readonly _userClass = input<ClassValue>('', {
    alias: 'class',
  });
  protected readonly _computedClass = computed(() => hlm('mt-4 block', this._userClass()));
}
