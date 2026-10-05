import { Routes } from '@angular/router';
import { meta } from '@elbe/ui/seo/config';

/**
 * Documentation for the non-visual libraries that power elbe/ui.
 *
 * Grouped under `/tools` (rather than `/components`) because they are
 * utilities, not UI components.
 */
export const toolsRoutes: Routes = [
  {
    path: '',
    loadComponent: () => import('../../layouts/docs.layout').then((m) => m.DocsLayout),
    children: [
      { path: '', redirectTo: 'seo', pathMatch: 'full' },
      {
        path: 'seo',
        loadComponent: () => import('./seo/seo.page').then((m) => m.SeoPage),
        title: 'SEO',
        data: {
          ...meta({
            description:
              'Route-driven document titles, meta tags, Open Graph and Twitter cards, and canonical URLs for Angular.',
            ogImage: '/assets/og/seo.webp',
          }),
        },
      },
    ],
  },
];
