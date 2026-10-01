import { InjectionToken, type ValueProvider, inject } from '@angular/core';
import type { Highlighter } from '@tanstack/highlight/core';

export interface ElbHighlightConfig {
  /** Core TanStack highlighter, shared by markdown and code blocks. */
  highlighter?: Highlighter;
  /** Shared default for code blocks and markdown fences. */
  codeLineNumbers?: boolean;
}

const defaultConfig: ElbHighlightConfig = {};

const ElbHighlightConfigToken = new InjectionToken<ElbHighlightConfig>('ElbHighlightConfig');

export function provideElbHighlightConfig(config: Partial<ElbHighlightConfig>): ValueProvider {
  return { provide: ElbHighlightConfigToken, useValue: { ...defaultConfig, ...config } };
}

export function injectElbHighlightConfig(): ElbHighlightConfig {
  return inject(ElbHighlightConfigToken, { optional: true }) ?? defaultConfig;
}
