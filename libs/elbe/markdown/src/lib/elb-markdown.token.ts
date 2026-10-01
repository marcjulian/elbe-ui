import { InjectionToken, type ValueProvider, inject } from '@angular/core';
import type { CodeHighlighter } from '@tanstack/markdown';

export interface ElbMarkdownConfig {
  highlighter?: CodeHighlighter;
}

const defaultConfig: ElbMarkdownConfig = {};

const ElbMarkdownConfigToken = new InjectionToken<ElbMarkdownConfig>('ElbMarkdownConfig');

export function provideElbMarkdownConfig(config: Partial<ElbMarkdownConfig>): ValueProvider {
  return { provide: ElbMarkdownConfigToken, useValue: { ...defaultConfig, ...config } };
}

export function injectElbMarkdownConfig(): ElbMarkdownConfig {
  return inject(ElbMarkdownConfigToken, { optional: true }) ?? defaultConfig;
}
