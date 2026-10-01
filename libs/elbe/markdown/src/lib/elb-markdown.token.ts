import { InjectionToken, type ValueProvider, inject } from '@angular/core';
import type { RenderOptions } from '@tanstack/markdown';

/** Markdown render options that are not shared with code blocks. */
export type ElbMarkdownRenderOptions = Omit<RenderOptions, 'highlighter' | 'codeLineNumbers'>;

export interface ElbMarkdownConfig {
  renderOptions?: ElbMarkdownRenderOptions;
}

const defaultConfig: ElbMarkdownConfig = {};

const ElbMarkdownConfigToken = new InjectionToken<ElbMarkdownConfig>('ElbMarkdownConfig');

export function provideElbMarkdownConfig(config: Partial<ElbMarkdownConfig>): ValueProvider {
  return { provide: ElbMarkdownConfigToken, useValue: { ...defaultConfig, ...config } };
}

export function injectElbMarkdownConfig(): ElbMarkdownConfig {
  return inject(ElbMarkdownConfigToken, { optional: true }) ?? defaultConfig;
}
