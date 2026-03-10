import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/home.page').then((m) => m.HomePage),
  },
  {
    path: 'components',
    title: 'Components',
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./pages/components/components.page').then((m) => m.ComponentsPage),
      },
      {
        path: 'drawer',
        loadComponent: () =>
          import('./pages/components/drawer/drawer.page').then((m) => m.DrawerPage),
        title: 'Drawer',
      },
      {
        path: 'gallery',
        loadComponent: () =>
          import('./pages/components/gallery/gallery.page').then((m) => m.GalleryPage),
        title: 'Gallery',
      },
      {
        path: 'map',
        loadComponent: () => import('./pages/components/map/map.page').then((m) => m.MapPage),
        title: 'Map',
      },
    ],
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
    path: '**',
    loadComponent: () => import('./pages/not-found.page').then((m) => m.NotFoundPage),
    title: 'Page Not Found',
  },
];
