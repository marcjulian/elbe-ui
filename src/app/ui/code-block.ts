import { ChangeDetectionStrategy, Component, inject, input, resource, signal } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideCheck, lucideCopy } from '@ng-icons/lucide';
import { HlmButtonImports } from '@spartan-ng/helm/button';
import { codeToHtml } from 'shiki/bundle/web';

@Component({
  selector: 'elb-code-block',
  host: {
    class: 'block relative',
  },
  imports: [NgIcon, HlmButtonImports],
  providers: [provideIcons({ lucideCopy, lucideCheck })],
  template: `
    @if (highlightedCode.hasValue()) {
      <div [innerHTML]="highlightedCode.value()"></div>
      <button
        hlmBtn
        variant="ghost"
        size="icon"
        class="absolute top-2 right-2 cursor-pointer dark:hover:bg-black/50"
        (click)="copy()"
        aria-label="Copy code"
      >
        @if (copied()) {
          <ng-icon name="lucideCheck" class="text-green-500" />
        } @else {
          <ng-icon name="lucideCopy" />
        }
      </button>
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CodeBlock {
  private readonly _domSanitizer = inject(DomSanitizer);

  code = input.required<string>();
  lang = input<'css' | 'typescript'>('css');

  copied = signal(false);

  async copy() {
    await navigator.clipboard.writeText(this.code());
    this.copied.set(true);
    setTimeout(() => this.copied.set(false), 2000);
  }

  highlightedCode = resource({
    params: () => ({ code: this.code(), lang: this.lang() }),
    loader: async ({ params }) => {
      const code = await codeToHtml(params.code, {
        lang: params.lang,
        themes: {
          light: 'github-light',
          dark: 'github-dark',
        },
        transformers: [
          {
            pre(node) {
              this.addClassToHast(node, 'p-3 rounded-md');
            },
          },
        ],
      });

      return this._domSanitizer.bypassSecurityTrustHtml(code);
    },
  });
}
