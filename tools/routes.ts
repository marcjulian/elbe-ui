import type { Routes } from '@angular/router';
import { routes } from '../src/app/app.routes';
import { componentsRoutes } from '../src/app/pages/components/components.routes';

/**
 * Route tree with lazily loaded route groups expanded inline.
 *
 * `app.routes.ts` lazy-loads the component pages via `loadChildren`, which the
 * static route walkers in the sitemap and OG tools cannot follow. Re-attach the
 * child routes here so those tools see every page.
 */
export const allRoutes: Routes = routes.map((route) =>
  route.path === 'components' ? { ...route, children: componentsRoutes } : route,
);
