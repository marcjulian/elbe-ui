import { Component } from '@angular/core';
import { ElbMarkdownImports } from '@elbe/ui/markdown';

@Component({
  selector: 'elb-markdown-preview',
  imports: [ElbMarkdownImports],
  host: {
    class: 'block w-full',
  },
  template: `
    <div class="flex flex-col gap-8">
      <div>
        <p class="text-muted-foreground mb-2 text-sm">Inline content</p>
        <elb-markdown># Hello World</elb-markdown>
      </div>

      <div>
        <p class="text-muted-foreground mb-2 text-sm">Content input</p>
        <elb-markdown content="# Hello World" />
      </div>

      <div>
        <p class="text-muted-foreground mb-2 text-sm">Source file</p>
        <elb-markdown src="assets/markdown/example.md" />
      </div>
    </div>
  `,
})
export class MarkdownPreview {}
