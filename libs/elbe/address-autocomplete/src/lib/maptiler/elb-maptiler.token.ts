import { inject, InjectionToken, type Provider } from '@angular/core';
import { type GeocodingForwardQueryParams } from './elb-maptiler.types';

export interface MaptilerConfig {
  apiKey: string;
  defaultParams?: GeocodingForwardQueryParams;
}

export const MaptilerConfigToken = new InjectionToken<MaptilerConfig>('MaptilerToken');

export type MaptilerConfigFactory = () => MaptilerConfig;

export function provideMaptilerConfig(config: MaptilerConfig | MaptilerConfigFactory): Provider {
  return typeof config === 'function'
    ? { provide: MaptilerConfigToken, useFactory: config }
    : { provide: MaptilerConfigToken, useValue: config };
}

export function injectMaptilerConfig(): MaptilerConfig {
  const config = inject(MaptilerConfigToken, { optional: true });
  if (!config) {
    throw new Error('MaptilerConfig is not provided');
  }
  return config;
}
