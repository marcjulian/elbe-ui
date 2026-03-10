import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { hlm } from '@spartan-ng/helm/utils';
import { ClassValue } from 'clsx';
import { Footer } from '../ui/footer';
import { Header } from '../ui/header';

@Component({
  selector: 'elb-base-layout',
  imports: [Header, Footer],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <elb-header />

    <main [class]="_computedMainClasses()">
      <ng-content />
    </main>

    <elb-footer />
  `,
})
export class BaseLayout {
  public readonly mainClasses = input<ClassValue>('');
  protected readonly _computedMainClasses = computed(() =>
    hlm('mx-auto max-w-(--breakpoint-lg) px-4 pb-20', this.mainClasses()),
  );
}
