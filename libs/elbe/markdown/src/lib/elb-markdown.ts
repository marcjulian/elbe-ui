import { httpResource } from '@angular/common/http';
import {
  AfterViewInit,
  Component,
  computed,
  effect,
  ElementRef,
  inject,
  input,
  linkedSignal,
} from '@angular/core';
import { injectElbHighlightConfig } from '@elbe/ui/highlight';
import { classes } from '@spartan-ng/helm/utils';
import { createTanStackMarkdownHighlighter } from '@tanstack/highlight/markdown';
import type { CodeHighlighter } from '@tanstack/markdown';
import { renderHtml } from '@tanstack/markdown/html';
import { injectElbMarkdownConfig, type ElbMarkdownRenderOptions } from './elb-markdown.token';

/** SSR → hydration carrier for inline markdown. */
const INLINE_SOURCE_ATTR = 'data-elb-markdown-source';

@Component({
  selector: '[elbMarkdown],elb-markdown',
  template: '<ng-content />',
  host: {
    'data-slot': 'markdown',
  },
})
export class ElbMarkdown implements AfterViewInit {
  private readonly _element = inject(ElementRef<HTMLElement>);
  private readonly _native = this._element.nativeElement;
  private readonly _config = injectElbMarkdownConfig();
  private readonly _highlight = injectElbHighlightConfig();

  public readonly content = input<string>();
  public readonly src = input<string>();
  public readonly renderOptions = input<ElbMarkdownRenderOptions | undefined>(undefined);

  /** Per-instance override; defaults to the shared highlight config. */
  public readonly highlighter = input<CodeHighlighter | undefined>(
    this._highlight.highlighter
      ? createTanStackMarkdownHighlighter(this._highlight.highlighter)
      : undefined,
  );

  private readonly _file = httpResource.text(() => this.src());

  /** Markdown source, overridable for inline usage. */
  protected readonly _markdown = linkedSignal<string | undefined>(() =>
    this.src() ? this._file.value() : this.content(),
  );

  private readonly _html = computed(() => {
    const markdown = this._markdown();
    if (!markdown) {
      return null;
    }
    return renderHtml(markdown, {
      ...this._config.renderOptions,
      ...this.renderOptions(),
      highlighter: this.highlighter(),
      codeLineNumbers: this._highlight.codeLineNumbers,
    });
  });

  constructor() {
    classes(() => 'typeset');

    effect(() => {
      const html = this._html();
      if (html != null) {
        this._native.innerHTML = html;
      }
    });
  }

  ngAfterViewInit(): void {
    if (this.content() || this.src()) {
      return;
    }

    // Inline: prefer the server-serialized source, else the projected text.
    const source = this._native.getAttribute(INLINE_SOURCE_ATTR) ?? this._native.textContent ?? '';
    this._native.setAttribute(INLINE_SOURCE_ATTR, source);
    this._markdown.set(source);
  }
}
