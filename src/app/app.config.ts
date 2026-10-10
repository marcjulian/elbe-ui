import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideClientHydration } from '@angular/platform-browser';
import { provideRouter, withComponentInputBinding, withInMemoryScrolling } from '@angular/router';
import { provideMaptilerConfig } from '@elbe/ui/address-autocomplete/config';
import { provideSeo } from '@elbe/ui/seo';
import { provideMaplibreWorker } from '@maplibre/ngx-maplibre-gl/config';
import { environment } from '../environments/environment';
import { routes } from './app.routes';

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
    provideClientHydration(),
    provideSeo({
      title: 'elbe/ui - Angular UI components built with Tailwind CSS and spartan/ui',
      siteName: 'elbe/ui',
      titleTemplate: '%s | elbe/ui',
      origin: environment.appUrl,
      description: 'Angular UI components built with Tailwind CSS and spartan/ui',
      robots: 'index, follow',
      ogType: 'website',
      ogImage: '/assets/og/og.webp',
      ogImageWidth: 1200,
      ogImageHeight: 630,
      twitterCard: 'summary_large_image',
    }),
    provideMaptilerConfig({ apiKey: environment.maptilerKey }),
    provideMaplibreWorker('maplibre-gl-worker.mjs'),
  ],
};
