import { Component } from '@angular/core';
import { ElbMarkdownImports } from '@elbe/ui/markdown';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { simpleGithub } from '@ng-icons/simple-icons';
import { HlmButtonImports } from '@spartan-ng/helm/button';
import { config } from '../../../config';
import { markdownHighlighter } from '../../../highlight';
import { H2, H3 } from '../../../ui/heading';

/** Wrap a code body in a fenced, syntax-highlighted markdown block. */
const code = (body: string, language = 'ts') => ['```' + language, body.trim(), '```'].join('\n');

@Component({
  selector: 'elb-theme-page',
  imports: [H2, H3, NgIcon, HlmButtonImports, ElbMarkdownImports],
  providers: [provideIcons({ simpleGithub })],
  template: `
    <div class="flex flex-col gap-2">
      <div class="flex justify-between">
        <h1 class="text-3xl font-semibold">Theme</h1>
        <a
          hlmBtn
          variant="outline"
          size="sm"
          href="${config.github}/tree/main/libs/elbe/theme/src/lib"
          target="_blank"
          rel="noopener noreferrer"
        >
          Open in
          <ng-icon name="simpleGithub" />
        </a>
      </div>
      <p class="text-muted-foreground max-w-2xl text-balance">
        Light and dark themes with system preference detection, a persisted choice, and a
        configurable dark class.
      </p>
    </div>

    <elb-h2 id="setup"> Setup </elb-h2>
    <div class="typeset mt-2">
      <p>
        The service is available out of the box with sensible defaults. Register
        <code>provideTheme</code> only when you want to override them.
      </p>
      <elb-markdown class="mt-6 block" [content]="setupSnippet" [highlighter]="highlighter" />
    </div>

    <elb-h2 id="configuration"> Configuration </elb-h2>
    <div class="typeset mt-2">
      <p>Every option is optional and falls back to the default shown above.</p>
      <ul>
        <li>
          <code>darkClass</code>: class toggled on <code>&lt;html&gt;</code> when the dark theme is
          active. Defaults to <code>'dark'</code>.
        </li>
        <li>
          <code>lightColor</code>: content of the <code>theme-color</code> meta tag in the light
          theme. Defaults to <code>'#ffffff'</code>.
        </li>
        <li>
          <code>darkColor</code>: content of the <code>theme-color</code> meta tag in the dark
          theme. Defaults to <code>'#0a0a0a'</code>.
        </li>
      </ul>
    </div>

    <elb-h2 id="usage"> Usage </elb-h2>
    <div class="typeset mt-2">
      <p>
        Inject <code>ElbTheme</code> anywhere. <code>isDark</code> is a signal, so templates and
        <code>computed</code> values update when the theme changes.
      </p>
      <elb-markdown class="mt-6 block" [content]="usageSnippet" [highlighter]="highlighter" />
    </div>

    <elb-h3 id="system-preference"> System preference </elb-h3>
    <div class="typeset mt-2">
      <p>
        When no explicit choice has been made, the service follows the operating system and reacts
        to changes. Choosing <code>'light'</code> or <code>'dark'</code> persists that choice in
        <code>localStorage</code>, while <code>'system-light'</code> and <code>'system-dark'</code>
        keep following the system.
      </p>
    </div>

    <elb-h2 id="theme-color"> Theme color </elb-h2>
    <div class="typeset mt-2">
      <p>
        The service updates an existing <code>theme-color</code> meta tag on every change so the
        browser chrome matches the resolved theme. Add one to your <code>index.html</code>:
      </p>
      <elb-markdown class="mt-6 block" [content]="metaSnippet" [highlighter]="highlighter" />
    </div>
  `,
})
export class ThemePage {
  protected readonly highlighter = markdownHighlighter;

  protected readonly setupSnippet = code(`
import { provideTheme } from '@elbe/ui/theme';

export const appConfig: ApplicationConfig = {
  providers: [
    provideTheme({
      darkClass: 'dark',
      lightColor: '#ffffff',
      darkColor: '#0a0a0a',
    }),
  ],
};
`);

  protected readonly usageSnippet = code(`
import { ElbTheme } from '@elbe/ui/theme';

private readonly theme = inject(ElbTheme);

// Toggle between light and dark.
this.theme.toggle();

// Or set an explicit theme, including the system modes.
this.theme.setTheme('system-dark');

// Read the resolved theme.
readonly isDark = this.theme.isDark;
`);

  protected readonly metaSnippet = code(`<meta name="theme-color" content="#ffffff" />`, 'html');
}
