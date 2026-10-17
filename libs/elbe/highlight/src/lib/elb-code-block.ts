import type { BooleanInput } from '@angular/cdk/coercion';
import {
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
} from '@angular/core';
import { HlmCodeBlock, HlmCodeBlockImports } from '@spartan-ng/helm/code-block';
import { classes } from '@spartan-ng/helm/utils';
import type { Highlighter } from '@tanstack/highlight/core';
import { highlightLines, type ElbHighlightToken } from './elb-highlight-lines';
import { injectElbHighlightConfig } from './elb-highlight.token';

@Component({
  selector: 'elb-code-block',
  imports: [HlmCodeBlockImports],
  hostDirectives: [{ directive: HlmCodeBlock, inputs: ['variant', 'size'] }],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @if (title()) {
      <hlm-code-block-header>
        <hlm-code-block-title>{{ title() }}</hlm-code-block-title>
      </hlm-code-block-header>
    }

    <!-- Whitespace inside the projected pre is literal — keep the loop on one line. -->
    <!-- prettier-ignore -->
    <pre hlmCodeBlockContent [lineNumbers]="lineNumbers()" [wrap]="wrap()">@for (line of _lines(); track $index) {<span hlmCodeBlockLine>@for (token of line; track $index) {<span [class]="token.classes">{{ token.value }}</span>}</span>}</pre>

    <hlm-code-block-actions>
      <button hlmCodeBlockCopyButton [value]="_code()"></button>
    </hlm-code-block-actions>
  `,
})
export class ElbCodeBlock {
  private readonly _config = injectElbHighlightConfig();

  public readonly code = input.required<string>();
  public readonly lang = input<string>();
  public readonly lineNumbers = input<boolean | undefined>(this._config.codeLineNumbers);
  public readonly title = input<string>();

  /** Wrap long lines instead of scrolling. Defaults to the shared highlight config. */
  public readonly wrap = input<boolean | undefined, BooleanInput>(this._config.codeWrap, {
    transform: booleanAttribute,
  });

  /** Per-instance override; defaults to the shared highlight config. */
  public readonly highlighter = input<Highlighter | undefined>(this._config.highlighter);

  /** Highlighter trims the trailing newline; copy exactly what is rendered. */
  protected readonly _code = computed(() => this.code().trimEnd());

  /**
   * One token array per source line, like shadcn's `useHighlightedCode`. Each line
   * is rendered inside `[hlmCodeBlockLine]`, so the code block owns line numbers,
   * wrapping and copy — the highlighting is just the tokens.
   */
  protected readonly _lines = computed<ElbHighlightToken[][]>(() => {
    const highlighter = this.highlighter();
    const code = this._code();

    if (!highlighter) {
      return code.split('\n').map((line) => [{ classes: '', value: line }]);
    }

    return highlightLines(highlighter, code, this.lang());
  });

  constructor() {
    classes(() => 'not-typeset mt-(--typeset-flow)');
  }
}
