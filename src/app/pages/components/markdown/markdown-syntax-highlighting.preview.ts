import { Component } from '@angular/core';
import { ElbMarkdownImports } from '@elbe/ui/markdown';

@Component({
  selector: 'elb-markdown-syntax-highlighting-preview',
  imports: [ElbMarkdownImports],
  host: {
    class: 'block w-full',
  },
  template: ` <elb-markdown [content]="markdown" /> `,
})
export class MarkdownSyntaxHighlightingPreview {
  protected readonly markdown = [
    '# Angular',
    '',
    'Fenced code blocks are highlighted with `@tanstack/highlight`:',
    '',
    '```ts',
    "import { Component, signal } from '@angular/core';",
    '',
    '@Component({',
    "  selector: 'app-counter',",
    '  template: `<button (click)="increment()">Count: {{ count() }}</button>`,',
    '})',
    'export class Counter {',
    '  protected readonly count = signal(0);',
    '',
    '  protected increment(): void {',
    '    this.count.update((value) => value + 1);',
    '  }',
    '}',
    '```',
  ].join('\n');
}
