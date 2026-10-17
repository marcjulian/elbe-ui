import {
  renderTokens,
  type HighlightElementNode,
  type HighlightRenderNode,
  type Highlighter,
} from '@tanstack/highlight/core';

/** A highlighted token: the classes to apply and its text. */
export interface ElbHighlightToken {
  readonly classes: string;
  readonly value: string;
}

/**
 * Highlights `code` and returns one array of tokens per source line — the Angular
 * counterpart of shadcn's `useHighlightedCode` hook.
 *
 * Render each line with `[hlmCodeBlockLine]` so the code block keeps control of line
 * numbers, wrapping and copy behaviour, e.g.
 *
 * ```html
 * <pre hlmCodeBlockContent [lineNumbers]="true">
 *   @for (line of lines(); track $index) {
 *     <span hlmCodeBlockLine>
 *       @for (token of line; track $index) {
 *         <span [class]="token.classes">{{ token.value }}</span>
 *       }
 *     </span>
 *   }
 * </pre>
 * ```
 */
export function highlightLines(
  highlighter: Highlighter,
  code: string,
  lang?: string,
): ElbHighlightToken[][] {
  const { tokens } = highlighter.tokenize(code.trimEnd(), { lang });

  // `lineNumbers` makes TanStack split the tokens into one `.th-line` wrapper per
  // source line while keeping tokens that span several lines intact. Drop the
  // wrapper and keep its tokens: the code block owns the line element.
  return renderTokens(tokens, { lineNumbers: true })
    .filter((node): node is HighlightElementNode => node.type === 'element')
    .map((line) => line.children.map(toToken));
}

function toToken(node: HighlightRenderNode): ElbHighlightToken {
  return { classes: node.type === 'element' ? node.classNames.join(' ') : '', value: textOf(node) };
}

function textOf(node: HighlightRenderNode): string {
  return node.type === 'text' ? node.value : node.children.map(textOf).join('');
}
