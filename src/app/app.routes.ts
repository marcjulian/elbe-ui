import { Routes } from '@angular/router';
import { meta } from './tools/seo.types';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/home.page').then((m) => m.HomePage),
  },
  {
    path: 'components',
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./pages/components/components.page').then((m) => m.ComponentsPage),
        title: 'Components',
        data: {
          ...meta({
            description: 'All available elbe/ui components',
            ogImage: '/assets/og/components.webp',
          }),
        },
      },
      {
        path: 'address-autocomplete',
        loadComponent: () =>
          import('./pages/components/address-autocomplete/address-autocomplete.page').then(
            (m) => m.AddressAutocompletePage,
          ),
        title: 'Address Autocomplete',
        data: {
          ...meta({
            description:
              'Address Autocomplete component built with spartan/ui Autocomplete and Maptiler Forward Geocoding API.',
            ogImage: '/assets/og/address-autocomplete.webp',
          }),
        },
      },
      {
        path: 'drawer',
        loadComponent: () =>
          import('./pages/components/drawer/drawer.page').then((m) => m.DrawerPage),
        title: 'Drawer',
        data: {
          ...meta({
            description: 'Drawer component built with Cupertino Panes library.',
            ogImage: '/assets/og/drawer.webp',
          }),
        },
      },
      {
        path: 'file-upload',
        loadComponent: () =>
          import('./pages/components/file-upload/file-upload.page').then((m) => m.FileUploadPage),
        title: 'File Upload',
        data: {
          ...meta({
            description:
              'File upload component built with Angular Primitives. Drag and drop, multi-file selection, and image previews.',
            ogImage: '/assets/og/file-upload.webp',
          }),
        },
      },
      {
        path: 'gallery',
        loadComponent: () =>
          import('./pages/components/gallery/gallery.page').then((m) => m.GalleryPage),
        title: 'Gallery',
        data: {
          ...meta({
            description: 'Image gallery built with photoswipe library.',
            ogImage: '/assets/og/gallery.webp',
          }),
        },
      },
      {
        path: 'map',
        loadComponent: () => import('./pages/components/map/map.page').then((m) => m.MapPage),
        title: 'Map',
        data: {
          ...meta({
            description: 'Map controls built for ngx-mapbox-gl library.',
            ogImage: '/assets/og/map.webp',
          }),
        },
      },
      {
        path: 'markdown',
        loadComponent: () =>
          import('./pages/components/markdown/markdown.page').then((m) => m.MarkdownPage),
        title: 'Markdown',
        data: {
          ...meta({
            description:
              'Markdown renderer built with TanStack Markdown. Render content inline, through an input, or loaded from a source file.',
            ogImage: '/assets/og/markdown.webp',
          }),
        },
      },
    ],
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
