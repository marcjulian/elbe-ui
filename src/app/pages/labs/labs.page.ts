import { Component } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { simpleGithub } from '@ng-icons/simple-icons';
import { HlmButtonImports } from '@spartan-ng/helm/button';
import { config } from '../../config';
import { BaseLayout } from '../../layouts/base.layout';
import { H2, H3 } from '../../ui/heading';
import { Preview } from '../../ui/preview';
import { ChartPreview } from './chart.preview';

@Component({
  selector: 'app-labs-page',
  imports: [BaseLayout, Preview, NgIcon, HlmButtonImports, H2, H3, ChartPreview],
  providers: [provideIcons({ simpleGithub })],
  template: `
    <elb-base-layout mainClass="pt-8">
      <div class="flex flex-col gap-2">
        <div class="flex justify-between">
          <h1 class="text-3xl font-semibold">Labs</h1>
        </div>
        <p class="text-muted-foreground max-w-md text-balance">
          A collection of experimental features that are still in development.
        </p>
      </div>

      <elb-h2 id="charts"> Charts </elb-h2>
      <div class="typeset mt-2">
        <p>
          Charts are build using
          <a
            href="https://tanstack.com/charts/latest/docs/framework/angular/adapter"
            target="_blank"
            rel="noopener noreferrer"
          >
            TanStack Charts (alpha).
          </a>
        </p>
        <p>Install <code>npm install @tanstack/angular-charts @tanstack/charts</code>.</p>
      </div>

      <div class="flex items-baseline justify-between gap-6">
        <elb-h3 id="chart-preview"> Area Chart </elb-h3>
        <a
          hlmBtn
          variant="outline"
          size="sm"
          href="${config.github}/tree/main/src/app/pages/labs/chart.preview.ts"
          target="_blank"
          rel="noopener noreferrer"
        >
          Open in
          <ng-icon name="simpleGithub" />
        </a>
      </div>
      <div elbPreview>
        <elb-chart-preview />
      </div>
    </elb-base-layout>
  `,
})
export class LabsPage {}
