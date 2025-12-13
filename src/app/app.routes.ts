import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/home.page').then((m) => m.HomePage),
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
  },
  {
    path: 'labs',
    loadComponent: () => import('./pages/labs').then((m) => m.LabsPage),
  },
  {
    path: '**',
    loadComponent: () => import('./pages/not-found.page').then((m) => m.NotFoundPage),
    title: 'Page Not Found',
  },
];
