import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  computed,
  inject,
  input,
  signal,
} from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideCheck, lucideCopy } from '@ng-icons/lucide';
import { HlmButtonImports } from '@spartan-ng/helm/button';
import { classes } from '@spartan-ng/helm/utils';
import type { Highlighter } from '@tanstack/highlight/core';
import { injectElbHighlightConfig } from './elb-highlight.token';

@Component({
  selector: 'elb-code-block',
  imports: [NgIcon, HlmButtonImports],
  providers: [provideIcons({ lucideCopy, lucideCheck })],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div [innerHTML]="_html()"></div>
    <button
      hlmBtn
      variant="ghost"
      size="icon"
      class="absolute top-1 right-1"
      (click)="copy()"
      aria-label="Copy code"
    >
      @if (copied()) {
        <ng-icon name="lucideCheck" class="text-green-500" />
      } @else {
        <ng-icon name="lucideCopy" />
      }
    </button>
  `,
})
export class ElbCodeBlock {
  private readonly _sanitizer = inject(DomSanitizer);
  private readonly _config = injectElbHighlightConfig();

  public readonly code = input.required<string>();
  public readonly lang = input<string>();
  public readonly lineNumbers = input<boolean | undefined>(this._config.codeLineNumbers);
  public readonly title = input<string>();

  /** Per-instance override; defaults to the shared highlight config. */
  public readonly highlighter = input<Highlighter | undefined>(this._config.highlighter);

  protected readonly copied = signal(false);

  private _copiedTimeout: ReturnType<typeof setTimeout> | undefined;

  constructor() {
    classes(
      () =>
        'border-border not-typeset relative mt-(--typeset-flow) block overflow-hidden rounded-lg border',
    );

    inject(DestroyRef).onDestroy(() => clearTimeout(this._copiedTimeout));
  }

  private readonly _block = computed(() => {
    const highlighter = this.highlighter();
    if (!highlighter) {
      return null;
    }
    return highlighter.renderCodeBlockData({
      code: this.code(),
      lang: this.lang(),
      lineNumbers: this.lineNumbers(),
      title: this.title(),
    });
  });

  // Highlighter output is escaped by TanStack, so trusting it is safe and preserves `data-*`.
  protected readonly _html = computed(() => {
    const block = this._block();
    return block ? this._sanitizer.bypassSecurityTrustHtml(block.htmlMarkup) : null;
  });

  protected async copy(): Promise<void> {
    try {
      await navigator.clipboard.writeText(this._block()?.copyText ?? this.code());
    } catch {
      // Clipboard can be unavailable (insecure context, permissions) — leave the icon unchanged.
      return;
    }

    this.copied.set(true);
    clearTimeout(this._copiedTimeout);
    this._copiedTimeout = setTimeout(() => this.copied.set(false), 2000);
  }
}
