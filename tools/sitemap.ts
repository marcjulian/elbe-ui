import { Route } from '@angular/router';
import { writeFileSync } from 'fs';
import { resolve } from 'path';
import { SitemapStream, streamToPromise } from 'sitemap';
import { Readable } from 'stream';
import { routes } from '../src/app/app.routes';
import { environment } from '../src/environments/environment';

// Helper to extract paths from Angular routes
function getPaths(routes: Route[], parentPath = ''): string[] {
  let paths: string[] = [];

  for (const route of routes) {
    if (route.redirectTo) {
      continue;
    }

    // Skip routes that set noindex robots
    const robots = route.data?.['meta']?.robots as string | undefined;
    if (robots?.includes('noindex')) {
      continue;
    }

    const currentPath = route.path ? `${parentPath}/${route.path}` : parentPath;
    // Clean up double slashes
    const cleanPath = currentPath.replace(/\/+/g, '/');

    if (route.component || route.loadComponent) {
      paths.push(cleanPath || '/');
    }

    if (route.children) {
      paths = paths.concat(getPaths(route.children, cleanPath));
    }
  }

  return paths;
}

async function generateSitemap() {
  try {
    console.log(`\n\x1b[1m📸 Generating sitemap\x1b[0m\n`);

    const stream = new SitemapStream({ hostname: environment.appUrl });

    const paths = getPaths(routes);
    const links = paths.map((url) => ({
      url,
    }));

    const data = await streamToPromise(Readable.from(links).pipe(stream));

    const path = resolve(resolve(process.cwd(), 'public'), 'sitemap.xml');
    writeFileSync(path, data.toString());

    paths.forEach((p) => console.log(`  \x1b[2m\x1b[32m✓\x1b[0m\x1b[2m ${p}\x1b[0m`));
    console.log(`  \x1b[2m   ${paths.length} routes included\x1b[0m\n`);
    console.log(`  \x1b[2m\x1b[32m✓\x1b[0m\x1b[2m sitemap.xml\x1b[0m\n`);
  } catch (error) {
    console.error(`  \x1b[2m\x1b[31m✗\x1b[0m\x1b[2m Error generating sitemap:\x1b[0m`, error);
    process.exit(1);
  }
}

generateSitemap();
