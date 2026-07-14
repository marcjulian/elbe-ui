import { Component, input } from '@angular/core';
import { ElbMarkdownImports } from '@elbe/ui/markdown';
import { BaseLayout } from '../../layouts/base.layout';

@Component({
  selector: 'app-legal',
  imports: [BaseLayout, ElbMarkdownImports],
  template: `
    <elb-base-layout class="flex min-h-dvh flex-col" mainClass="flex-1">
      <div class="mx-auto max-w-xl py-12">
        <elb-markdown [src]="file()" />
      </div>
    </elb-base-layout>
  `,
})
export class LegalPage {
  public readonly file = input.required<string>();
}
