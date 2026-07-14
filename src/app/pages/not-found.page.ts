import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideArrowLeft } from '@ng-icons/lucide';
import { HlmButtonImports } from '@spartan-ng/helm/button';
import { HlmEmptyImports } from '@spartan-ng/helm/empty';
import { BaseLayout } from '../layouts/base.layout';

@Component({
  selector: 'elb-not-found',
  imports: [BaseLayout, RouterLink, NgIcon, HlmButtonImports, HlmEmptyImports],
  providers: [provideIcons({ lucideArrowLeft })],
  template: `
    <elb-base-layout
      class="flex min-h-dvh flex-col"
      mainClass="flex-1 flex items-center justify-center"
    >
      <hlm-empty>
        <hlm-empty-header>
          <p class="text-primary text-base font-semibold">404</p>
          <h1 hlmEmptyTitle>Page not found</h1>
          <p hlmEmptyDescription>Sorry, we couldn't find the page you're looking for.</p>
        </hlm-empty-header>
        <hlm-empty-content>
          <a routerLink="/" hlmBtn variant="ghost">
            <ng-icon name="lucideArrowLeft" />
            Back to home
          </a>
        </hlm-empty-content>
      </hlm-empty>
    </elb-base-layout>
  `,
})
export class NotFoundPage {}
