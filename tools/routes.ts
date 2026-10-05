import type { Routes } from '@angular/router';
import { routes } from '../src/app/app.routes';
import { componentsRoutes } from '../src/app/pages/components/components.routes';
import { toolsRoutes } from '../src/app/pages/tools/tools.routes';

/** Inline the children for every route group that is lazy-loaded via `loadChildren`. */
const lazyChildren: Record<string, Routes> = {
  components: componentsRoutes,
  tools: toolsRoutes,
};

/**
 * Route tree with lazily loaded route groups expanded inline.
 *
 * `app.routes.ts` lazy-loads the component and tool pages via `loadChildren`,
 * which the static route walkers in the sitemap and OG tools cannot follow.
 * Re-attach the child routes here so those tools see every page.
 */
export const allRoutes: Routes = routes.map((route) =>
  route.path && lazyChildren[route.path] ? { ...route, children: lazyChildren[route.path] } : route,
);
