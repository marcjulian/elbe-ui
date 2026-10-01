import { createHighlighter } from '@tanstack/highlight/core';
import { css } from '@tanstack/highlight/languages/css';
import { html } from '@tanstack/highlight/languages/html';
import { js } from '@tanstack/highlight/languages/js';
import { plaintext } from '@tanstack/highlight/languages/plaintext';
import { ts } from '@tanstack/highlight/languages/ts';
import { createTanStackMarkdownHighlighter } from '@tanstack/highlight/markdown';

/** Shared TanStack highlighter used by code blocks. */
export const elbHighlighter = createHighlighter({ languages: [plaintext, html, js, ts, css] });

/**
 * Markdown-flavored highlighter for `elb-markdown` fences. The markdown component
 * is decoupled from `@tanstack/highlight`, so the core highlighter is wrapped here.
 */
export const markdownHighlighter = createTanStackMarkdownHighlighter(elbHighlighter);
