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
  selector: 'elb-seo-page',
  imports: [H2, H3, NgIcon, HlmButtonImports, ElbMarkdownImports],
  providers: [provideIcons({ simpleGithub })],
  template: `
    <div class="flex flex-col gap-2">
      <div class="flex justify-between">
        <h1 class="text-3xl font-semibold">SEO</h1>
        <a
          hlmBtn
          variant="outline"
          size="sm"
          href="${config.github}/tree/main/libs/elbe/seo/src/lib"
          target="_blank"
          rel="noopener noreferrer"
        >
          Open in
          <ng-icon name="simpleGithub" />
        </a>
      </div>
      <p class="text-muted-foreground max-w-2xl text-balance">
        Document titles, meta tags, Open Graph and Twitter cards, and canonical URLs, driven by the
        router and built on Angular's <code>TitleStrategy</code>.
      </p>
    </div>

    <elb-h2 id="prerequisites"> Prerequisites </elb-h2>
    <div class="typeset mt-2">
      <p>
        The library reads and updates the tags that are already on the page. The canonical link in
        particular is only ever updated, never created. Add a static baseline to your
        <code>index.html</code> so the correct tags exist for the first paint, before Angular
        bootstraps.
      </p>
      <elb-markdown
        class="mt-6 block"
        [content]="prerequisitesSnippet"
        [highlighter]="highlighter"
      />
      <p>
        <code>setCanonical()</code> queries the existing
        <code>&lt;link rel="canonical"&gt;</code> and rewrites its <code>href</code> on every
        navigation, resolving relative URLs against the configured <code>origin</code> and stripping
        fragments. Without that element in <code>index.html</code>, there is nothing to update.
      </p>
    </div>

    <elb-h2 id="setup"> Setup </elb-h2>
    <div class="typeset mt-2">
      <p>
        Add <code>provideSeo</code> to your application config. It must be registered
        <strong>after</strong> <code>provideRouter(...)</code> so the custom
        <code>TitleStrategy</code> replaces the router's default.
      </p>
      <elb-markdown class="mt-6 block" [content]="setupSnippet" [highlighter]="highlighter" />
      <p>
        <code>title</code>, <code>titleTemplate</code> and <code>origin</code> are required;
        everything else is optional. These values act as defaults and can be overridden per route.
        Pass a function instead of a string for <code>titleTemplate</code> when you need full
        control over the rendered title.
      </p>
    </div>

    <elb-h2 id="route-metadata"> Route metadata </elb-h2>
    <div class="typeset mt-2">
      <p>
        Attach SEO values to a route with the typesafe <code>meta</code> helper. Titles come from
        the route's <code>title</code>; everything else lives in <code>data.meta</code>.
      </p>
      <elb-markdown class="mt-6 block" [content]="routeSnippet" [highlighter]="highlighter" />
      <p>
        On navigation the strategy walks the activated route chain and merges
        <code>data.meta</code> from parent to child, so a child overrides its parent. The merged
        config is applied together with the defaults from <code>provideSeo</code>.
      </p>
    </div>

    <elb-h3 id="exclude"> Excluding a page </elb-h3>
    <div class="typeset mt-2">
      <p>
        Add <code>robots: 'noindex, follow'</code> to a route's meta to keep it out of search
        indexes. This is useful for previews, legal pages and 404s.
      </p>
    </div>

    <elb-h2 id="imperative-api"> Imperative API </elb-h2>
    <div class="typeset mt-2">
      <p>
        Inject <code>ElbSeo</code> to update tags outside of navigation, for example after
        asynchronously loading content. <code>set()</code> accepts any subset of the config.
      </p>
      <elb-markdown class="mt-6 block" [content]="imperativeSnippet" [highlighter]="highlighter" />
    </div>

    <elb-h2 id="canonical-urls"> Canonical URLs </elb-h2>
    <div class="typeset mt-2">
      <p>
        The canonical URL is resolved against the configured <code>origin</code>: relative route
        paths are normalized and fragments are stripped, so
        <code>/components/gallery#preview</code> becomes
        <code>https://example.com/components/gallery</code>.
      </p>
    </div>
  `,
})
export class SeoPage {
  protected readonly highlighter = markdownHighlighter;

  protected readonly prerequisitesSnippet = code(
    `
<link rel="canonical" href="https://example.com" />

<meta name="description" content="Angular UI components built with Tailwind CSS." />
<meta name="robots" content="index, follow" />

<meta property="og:title" content="My App" />
<meta property="og:description" content="Angular UI components built with Tailwind CSS." />
<meta property="og:type" content="website" />
<meta property="og:image" content="https://example.com/assets/og/og.webp" />

<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content="My App" />
<meta name="twitter:description" content="Angular UI components built with Tailwind CSS." />
<meta name="twitter:image" content="https://example.com/assets/og/og.webp" />
`,
    'html',
  );

  protected readonly setupSnippet = code(`
import { provideSeo } from '@elbe/ui/seo';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideSeo({
      title: 'My App',
      titleTemplate: '%s | My App',
      origin: 'https://example.com',
      description: 'Angular UI components built with Tailwind CSS.',
      ogImage: '/assets/og/og.webp',
    }),
  ],
};
`);

  protected readonly routeSnippet = code(`
import { meta } from '@elbe/ui/seo/config';

export const routes: Routes = [
  {
    path: 'components',
    title: 'Components',
    data: {
      ...meta({
        description: 'All available elbe/ui components.',
        ogImage: '/assets/og/components.webp',
        robots: 'index, follow',
      }),
    },
  },
];
`);

  protected readonly imperativeSnippet = code(`
import { ElbSeo } from '@elbe/ui/seo';

private readonly seo = inject(ElbSeo);

this.seo.setDescription('Loaded description');
this.seo.setRobots('noindex, follow');
this.seo.setCanonical('/components/gallery');
`);
}
