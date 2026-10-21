import { Routes } from '@angular/router';
import { provideElbHighlightConfig } from '@elbe/ui/highlight/config';
import { meta } from '@elbe/ui/seo/config';
import { elbHighlighter } from '../../highlight';

/**
 * Documentation for the map components.
 *
 * Grouped under `/maps` (rather than `/components`) so the routes mirror the
 * map entry points, e.g. marker -> `/maps/marker`.
 */
export const mapsRoutes: Routes = [
  {
    path: '',
    loadComponent: () => import('../../layouts/docs.layout').then((m) => m.DocsLayout),
    providers: [provideElbHighlightConfig({ highlighter: elbHighlighter })],
    children: [
      {
        path: '',
        loadComponent: () => import('./map/map.page').then((m) => m.MapPage),
        title: 'Map',
        data: {
          ...meta({
            description: 'Maplibre map component for Angular, with markers, popups and controls.',
            ogImage: '/assets/og/maps.webp',
          }),
        },
      },
      {
        path: 'marker',
        loadComponent: () => import('./marker/marker.page').then((m) => m.MarkerPage),
        title: 'Marker',
        data: {
          ...meta({
            description:
              'Anchor HTML content to a position on the map and style it through the host element.',
            ogImage: '/assets/og/maps-marker.webp',
          }),
        },
      },
      {
        path: 'popup',
        loadComponent: () => import('./popup/popup.page').then((m) => m.PopupPage),
        title: 'Popup',
        data: {
          ...meta({
            description: 'Popups anchored to a position, a feature or a marker on the map.',
            ogImage: '/assets/og/maps-popup.webp',
          }),
        },
      },
      {
        path: 'control',
        loadComponent: () => import('./control/control.page').then((m) => m.ControlPage),
        title: 'Controls',
        data: {
          ...meta({
            description: 'Custom map controls and native MapLibre control directives.',
            ogImage: '/assets/og/maps-control.webp',
          }),
        },
      },
      {
        path: 'source',
        loadComponent: () => import('./source/source.page').then((m) => m.SourcePage),
        title: 'Source',
        data: {
          ...meta({
            description: 'Add GeoJSON data to the map with a declarative source directive.',
            ogImage: '/assets/og/maps-source.webp',
          }),
        },
      },
      {
        path: 'image',
        loadComponent: () => import('./image/image.page').then((m) => m.ImagePage),
        title: 'Image',
        data: {
          ...meta({
            description: 'Register an image in the map style for icons, symbols and patterns.',
            ogImage: '/assets/og/maps-image.webp',
          }),
        },
      },
    ],
  },
];
