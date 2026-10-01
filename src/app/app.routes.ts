import { Routes } from '@angular/router';
import { meta } from './tools/seo.types';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/home.page').then((m) => m.HomePage),
  },
  {
    path: 'components',
    loadChildren: () =>
      import('./pages/components/components.routes').then((m) => m.componentsRoutes),
  },
  {
    path: 'labs',
    loadComponent: () => import('./pages/labs/labs.page').then((m) => m.LabsPage),
    title: 'Labs',
    data: {
      ...meta({
        description:
          'A collection of experimental components and blocks that are still in development.',
        ogImage: '/assets/og/labs.webp',
      }),
    },
  },
  {
    path: 'preview',
    children: [
      {
        path: 'sidebar-drawer',
        loadComponent: () =>
          import('./pages/preview/sidebar-drawer-preview.page').then(
            (m) => m.SidebarDrawerPreviewPage,
          ),
        title: 'Sidebar Drawer Preview',
      },
    ],
    data: { ...meta({ robots: 'noindex, follow' }) },
  },

  {
    path: 'imprint',
    loadComponent: () => import('./pages/legal/legal.page').then((m) => m.LegalPage),
    title: 'Imprint',
    data: {
      file: 'assets/legal/imprint.md',
      ...meta({ robots: 'noindex, follow' }),
    },
  },
  {
    path: 'privacy',
    loadComponent: () => import('./pages/legal/legal.page').then((m) => m.LegalPage),
    title: 'Privacy Policy',
    data: {
      file: 'assets/legal/privacy.md',
      ...meta({ robots: 'noindex, follow' }),
    },
  },
  {
    path: '**',
    loadComponent: () => import('./pages/not-found.page').then((m) => m.NotFoundPage),
    title: 'Page Not Found',
    data: { ...meta({ robots: 'noindex, follow' }) },
  },
];
