import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/home.page').then((m) => m.HomePage),
  },
  {
    path: '404',
    loadComponent: () => import('./pages/not-found.page').then((m) => m.NotFoundPage),
  },
  {
    path: '**',
    redirectTo: '404',
  },
];
