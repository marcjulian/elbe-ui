import { InjectionToken, type ValueProvider, inject } from '@angular/core';
import type { CodeHighlighter, RenderOptions } from '@tanstack/markdown';

/** Markdown render options, excluding highlighting which is configured separately. */
export type ElbMarkdownRenderOptions = Omit<RenderOptions, 'highlighter' | 'codeLineNumbers'>;

export interface ElbMarkdownConfig {
  renderOptions?: ElbMarkdownRenderOptions;
  /**
   * Markdown-flavored highlighter, e.g. `createTanStackMarkdownHighlighter(highlighter)`.
   * The markdown package does not depend on `@tanstack/highlight`.
   */
  highlighter?: CodeHighlighter;
  /** Render line numbers in fenced code blocks. */
  codeLineNumbers?: boolean;
}

const defaultConfig: ElbMarkdownConfig = {};

const ElbMarkdownConfigToken = new InjectionToken<ElbMarkdownConfig>('ElbMarkdownConfig');

export function provideElbMarkdownConfig(config: Partial<ElbMarkdownConfig>): ValueProvider {
  return { provide: ElbMarkdownConfigToken, useValue: { ...defaultConfig, ...config } };
}

export function injectElbMarkdownConfig(): ElbMarkdownConfig {
  return inject(ElbMarkdownConfigToken, { optional: true }) ?? defaultConfig;
}
