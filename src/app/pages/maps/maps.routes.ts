import { Routes } from '@angular/router';
import { provideElbHighlightConfig } from '@elbe/ui/highlight/config';
import { meta } from '@elbe/ui/seo/config';
import { elbHighlighter } from '../../highlight';

/**
 * Documentation for the map library (`@elbe-ui/map`).
 *
 * Grouped under `/maps` (rather than `/components`) so the routes mirror the
 * package entry points, e.g. `@elbe-ui/map/marker` -> `/maps/marker`.
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
            description:
              'MapLibre map directive for Angular, with spartan/ui styled controls. Part of @elbe-ui/map.',
            ogImage: '/assets/og/map.webp',
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
              'Marker directive for @elbe-ui/map, anchored at a position and styled through the host element.',
            ogImage: '/assets/og/map.webp',
          }),
        },
      },
      {
        path: 'popup',
        loadComponent: () => import('./popup/popup.page').then((m) => m.PopupPage),
        title: 'Popup',
        data: {
          ...meta({
            description:
              'Popup directive for @elbe-ui/map, anchored to a position, a feature or a marker.',
            ogImage: '/assets/og/map.webp',
          }),
        },
      },
      {
        path: 'control',
        loadComponent: () => import('./control/control.page').then((m) => m.ControlPage),
        title: 'Controls',
        data: {
          ...meta({
            description:
              'Custom map controls and MapLibre native control directives for @elbe-ui/map.',
            ogImage: '/assets/og/map.webp',
          }),
        },
      },
    ],
  },
];
