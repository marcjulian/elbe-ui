import { Component, computed, input } from '@angular/core';
import { hlm } from '@spartan-ng/helm/utils';
import { ClassValue } from 'clsx';
import { Footer } from '../ui/footer';
import { Header } from '../ui/header';

@Component({
  selector: 'elb-base-layout',
  imports: [Header, Footer],
  template: `
    <elb-header />

    <main [class]="_computedMainClass()">
      <ng-content />
    </main>

    <elb-footer />
  `,
})
export class BaseLayout {
  public readonly mainClass = input<ClassValue>('');
  protected readonly _computedMainClass = computed(() =>
    hlm('mx-auto max-w-(--breakpoint-lg) px-4 pb-20', this.mainClass()),
  );
}
