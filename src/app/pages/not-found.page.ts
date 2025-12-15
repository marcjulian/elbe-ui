import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { HlmButton } from '@spartan-ng/helm/button';
import { BaseLayout } from '../layouts/base.layout';

@Component({
  selector: 'elb-not-found',
  imports: [BaseLayout, RouterLink, HlmButton],
  template: `
    <elb-base-layout>
      <div class="min-h-[50vh] py-24 text-center">
        <p class="text-primary text-base font-semibold">404</p>
        <h1
          class="mt-4 text-5xl font-semibold tracking-tight text-balance text-gray-900 sm:text-7xl"
        >
          Page not found
        </h1>
        <p class="mt-6 text-lg font-medium text-pretty text-gray-500 sm:text-xl/8">
          Sorry, we couldn't find the page you're looking for.
        </p>
        <div class="mt-10 flex items-center justify-center gap-x-6">
          <a routerLink="/" hlmBtn variant="ghost"
            ><span aria-hidden="true">&larr;</span> Back to home</a
          >
        </div>
      </div>
    </elb-base-layout>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NotFoundPage {}
