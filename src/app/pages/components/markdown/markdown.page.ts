import { Component } from '@angular/core';
import { provideElbMarkdownConfig } from '@elbe/ui/markdown';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { simpleGithub } from '@ng-icons/simple-icons';
import { HlmButtonImports } from '@spartan-ng/helm/button';
import { config } from '../../../config';
import { BaseLayout } from '../../../layouts/base.layout';
import { H2, H3 } from '../../../ui/heading';
import { Preview } from '../../../ui/preview';
import { highlightMarkdownCode } from './markdown-highlighter';
import { MarkdownSyntaxHighlightingPreview } from './markdown-syntax-highlighting.preview';
import { MarkdownPreview } from './markdown.preview';

@Component({
  selector: 'app-markdown-page',
  imports: [
    BaseLayout,
    Preview,
    NgIcon,
    HlmButtonImports,
    H2,
    H3,
    MarkdownPreview,
    MarkdownSyntaxHighlightingPreview,
  ],
  providers: [
    provideIcons({ simpleGithub }),
    provideElbMarkdownConfig({ highlighter: highlightMarkdownCode }),
  ],
  template: `
    <elb-base-layout mainClass="pt-8">
      <div class="flex flex-col gap-2">
        <div class="flex justify-between">
          <h1 class="text-3xl font-semibold">Markdown</h1>
          <a
            hlmBtn
            variant="outline"
            size="sm"
            href="${config.github}/tree/main/libs/elbe/markdown/src/lib"
            target="_blank"
            rel="noopener noreferrer"
          >
            Open in
            <ng-icon name="simpleGithub" />
          </a>
        </div>
        <p class="text-muted-foreground max-w-2xl text-balance">
          Markdown renderer built with TanStack Markdown. Render content passed inline, through an
          input, or loaded from a source file.
        </p>
      </div>

      <div elbPreview>
        <elb-markdown-preview />
      </div>

      <elb-h2 id="about"> About </elb-h2>
      <div class="typeset mt-2">
        <p>
          This component uses
          <a href="https://tanstack.com/markdown" target="_blank" rel="noopener noreferrer">
            TanStack Markdown
          </a>
          to render markdown to HTML. Install
          <code>npm install @tanstack/markdown</code>.
        </p>
      </div>

      <elb-h2 id="examples"> Examples </elb-h2>

      <div class="flex items-baseline justify-between gap-6">
        <elb-h3 id="syntax-highlighting"> Syntax Highlighting </elb-h3>
        <a
          hlmBtn
          variant="outline"
          size="sm"
          href="${config.github}/tree/main/src/app/pages/components/markdown/markdown-syntax-highlighting.preview.ts"
          target="_blank"
          rel="noopener noreferrer"
        >
          Open in
          <ng-icon name="simpleGithub" />
        </a>
      </div>
      <div elbPreview>
        <elb-markdown-syntax-highlighting-preview />
      </div>
    </elb-base-layout>
  `,
})
export class MarkdownPage {}
