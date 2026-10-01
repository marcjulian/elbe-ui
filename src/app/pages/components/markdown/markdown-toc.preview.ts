import { Component } from '@angular/core';
import { ElbMarkdownImports } from '@elbe/ui/markdown';

@Component({
  selector: 'elb-markdown-toc-preview',
  imports: [ElbMarkdownImports],
  host: {
    class: 'block w-full',
  },
  template: `
    <div class="grid w-full gap-8 md:grid-cols-[minmax(0,1fr)_12rem]">
      <elb-markdown #md [content]="markdown" />

      <aside class="order-first md:order-last">
        <elb-markdown-toc [headings]="md.headings()" [minLevel]="2" [maxLevel]="3" />
      </aside>
    </div>
  `,
})
export class MarkdownTocPreview {
  protected readonly markdown = [
    '# Getting started',
    '',
    'A short guide whose table of contents is generated from the parsed headings.',
    '',
    '## Installation',
    '',
    'Install the package and import the component.',
    '',
    '## Usage',
    '',
    '### Inline content',
    '',
    'Pass markdown as projected content.',
    '',
    '#### Projected content',
    '',
    'This level four heading is hidden from the table of contents by `maxLevel`.',
    '',
    '### Source file',
    '',
    'Load markdown from a file with `src`.',
    '',
    '## API',
    '',
    'Reference for the component inputs.',
  ].join('\n');
}
