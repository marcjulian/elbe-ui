import { createThemeCss } from '@tanstack/highlight/theme';
import { githubDarkTheme } from '@tanstack/highlight/themes/github-dark';
import { githubLightTheme } from '@tanstack/highlight/themes/github-light';
import { writeFileSync } from 'fs';
import { resolve } from 'path';

const css = createThemeCss({
  light: githubLightTheme,
  dark: githubDarkTheme,
  lightSelector: ':root',
  darkSelector: '.dark',
  codeBlockSelector: 'pre.tm-code',
  lineNumbersSelector: '.tm-code--line-numbers',
});

const path = resolve(process.cwd(), 'src/highlight.css');
writeFileSync(path, css);
console.log(`  \x1b[2m\x1b[32m✓\x1b[0m\x1b[2m ${path}\x1b[0m`);
