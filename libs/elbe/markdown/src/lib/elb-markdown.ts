import { BooleanInput } from '@angular/cdk/coercion';
import { httpResource } from '@angular/common/http';
import {
  AfterViewInit,
  booleanAttribute,
  Component,
  computed,
  effect,
  ElementRef,
  inject,
  input,
  linkedSignal,
} from '@angular/core';
import { classes } from '@spartan-ng/helm/utils';
import {
  parseMarkdown,
  type CodeHighlighter,
  type MarkdownDocument,
  type MarkdownHeading,
} from '@tanstack/markdown';
import { collectMarkdownHeadings } from '@tanstack/markdown/extensions/headings';
import { renderDocument } from '@tanstack/markdown/html';
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

  public readonly content = input<string>();
  public readonly src = input<string>();
  public readonly renderOptions = input<ElbMarkdownRenderOptions | undefined>(
    this._config.renderOptions,
  );

  /**
   * Markdown-flavored highlighter for fenced code blocks, e.g.
   * `createTanStackMarkdownHighlighter(highlighter)`. Defaults to the markdown config.
   */
  public readonly highlighter = input<CodeHighlighter | undefined>(this._config.highlighter);

  /** Per-instance override; defaults to the markdown config. */
  public readonly codeLineNumbers = input<boolean | undefined, BooleanInput>(
    this._config.codeLineNumbers,
    { transform: booleanAttribute },
  );

  private readonly _file = httpResource.text(() => this.src());

  /** Markdown source, overridable for inline usage. */
  protected readonly _markdown = linkedSignal<string | undefined>(() =>
    this.src() ? this._file.value() : this.content(),
  );

  private readonly _document = computed<MarkdownDocument | null>(() => {
    const markdown = this._markdown();
    return markdown ? parseMarkdown(markdown, this.renderOptions()) : null;
  });

  /**
   * Headings parsed from the markdown, with generated IDs, e.g. to build a
   * table of contents. Empty when `renderOptions.headingIds` is `false`.
   */
  public readonly headings = computed<MarkdownHeading[]>(() => {
    const document = this._document();
    return document ? collectMarkdownHeadings(document) : [];
  });

  private readonly _html = computed(() => {
    const document = this._document();
    if (!document) {
      return null;
    }
    return renderDocument(document, {
      ...this.renderOptions(),
      highlighter: this.highlighter(),
      codeLineNumbers: this.codeLineNumbers(),
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
