import { Routes } from '@angular/router';
import { provideElbHighlightConfig } from '@elbe/ui/highlight/config';
import { elbHighlighter } from '../../highlight';
import { meta } from '../../tools/seo.types';

/**
 * Component routes are loaded lazily as a group so the shared highlighter
 * (`elbHighlighter`) stays out of the initial bundle.
 */
export const componentsRoutes: Routes = [
  {
    path: '',
    providers: [provideElbHighlightConfig({ highlighter: elbHighlighter })],
    children: [
      {
        path: '',
        loadComponent: () => import('./components.page').then((m) => m.ComponentsPage),
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
          import('./address-autocomplete/address-autocomplete.page').then(
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
        loadComponent: () => import('./drawer/drawer.page').then((m) => m.DrawerPage),
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
        loadComponent: () => import('./file-upload/file-upload.page').then((m) => m.FileUploadPage),
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
        loadComponent: () => import('./gallery/gallery.page').then((m) => m.GalleryPage),
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
        loadComponent: () => import('./map/map.page').then((m) => m.MapPage),
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
        loadComponent: () => import('./markdown/markdown.page').then((m) => m.MarkdownPage),
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
];
