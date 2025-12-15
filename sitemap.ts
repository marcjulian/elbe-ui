import { Route } from '@angular/router';
import { writeFileSync } from 'fs';
import { resolve } from 'path';
import { SitemapStream, streamToPromise } from 'sitemap';
import { Readable } from 'stream';
import { routes } from './src/app/app.routes';

// Helper to extract paths from Angular routes
function getPaths(routes: Route[], parentPath = ''): string[] {
  let paths: string[] = [];

  for (const route of routes) {
    if (route.path === '**' || route.redirectTo) {
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
    const stream = new SitemapStream({ hostname: 'https://elbe-ui.dev' });

    // TODO filter out routes starting with /preview
    const paths = getPaths(routes).filter((path) => !path.startsWith('/preview'));
    const links = paths.map((url) => ({
      url,
    }));

    const data = await streamToPromise(Readable.from(links).pipe(stream));

    const path = resolve(resolve(process.cwd(), 'public'), 'sitemap.xml');
    writeFileSync(path, data.toString());

    console.log('✅ Sitemap generated successfully at', path);
    console.log('   Routes included:', paths.join(', '));
  } catch (error) {
    console.error('❌ Error generating sitemap:', error);
    process.exit(1);
  }
}

generateSitemap();
