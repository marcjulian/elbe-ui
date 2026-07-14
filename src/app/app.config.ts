import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter, withComponentInputBinding, withInMemoryScrolling } from '@angular/router';

import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
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
      description: 'Angular UI components built with Tailwind CSS and spartan/ui',
      keywords: 'Angular,spartan/ui,Tailwind CSS,Paddling Spots',
      robots: 'index, follow',
      ogType: 'website',
      ogImage: '/assets/og/og.webp',
      twitterCard: 'summary_large_image',
    }),
    provideTitleStrategy(),
  ],
};
