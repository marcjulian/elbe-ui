import { createHighlighter } from '@tanstack/highlight/core';
import { css } from '@tanstack/highlight/languages/css';
import { html } from '@tanstack/highlight/languages/html';
import { js } from '@tanstack/highlight/languages/js';
import { plaintext } from '@tanstack/highlight/languages/plaintext';
import { ts } from '@tanstack/highlight/languages/ts';

/** Shared TanStack highlighter for markdown fences and code blocks. */
export const elbHighlighter = createHighlighter({ languages: [plaintext, html, js, ts, css] });
