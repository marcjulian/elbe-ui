import { bootstrapApplication } from '@angular/platform-browser';
import { setWorkerUrl } from 'maplibre-gl';
import { App } from './app/app';
import { appConfig } from './app/app.config';

setWorkerUrl(new URL('maplibre-gl-worker.mjs', document.baseURI).href);

bootstrapApplication(App, appConfig).catch((err) => console.error(err));
