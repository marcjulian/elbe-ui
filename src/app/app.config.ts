import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideRouter, withComponentInputBinding, withInMemoryScrolling } from '@angular/router';
import { provideMaptilerConfig } from '@elbe/ui/address-autocomplete';
import { provideMaplibreWorker } from '@maplibre/ngx-maplibre-gl/config';
import { environment } from '../environments/environment';
import { routes } from './app.routes';
import { provideSeo } from './tools/seo.types';
import { provideTitleStrategy } from './tools/title.strategy';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(
      routes,
      withComponentInputBinding(),
      withInMemoryScrolling({
        anchorScrolling: 'enabled',
        scrollPositionRestoration: 'enabled',
      }),
    ),
    provideClientHydration(withEventReplay()),
    provideSeo({
      title: 'elbe/ui - Angular UI components built with Tailwind CSS and spartan/ui',
      titleTemplate: '%s | elbe/ui',
      description: 'Angular UI components built with Tailwind CSS and spartan/ui',
      robots: 'index, follow',
      ogType: 'website',
      ogImage: '/assets/og/og.webp',
      twitterCard: 'summary_large_image',
    }),
    provideTitleStrategy(),
    provideMaptilerConfig({ apiKey: environment.maptilerKey }),
    provideMaplibreWorker('maplibre-gl-worker.mjs'),
  ],
};
