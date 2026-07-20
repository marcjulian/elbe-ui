import { inject, InjectionToken, ValueProvider } from '@angular/core';
import { GeocodingForwardQueryParams } from './elb-maptiler.types';

export interface MaptilerConfig {
  apiKey: string;
  defaultParams?: GeocodingForwardQueryParams;
}

export const MaptilerConfigToken = new InjectionToken<MaptilerConfig>('MaptilerToken');

export function provideMaptilerConfig(config: MaptilerConfig): ValueProvider {
  return { provide: MaptilerConfigToken, useValue: config };
}

export function injectMaptilerConfig(): MaptilerConfig {
  const config = inject(MaptilerConfigToken, { optional: true });
  if (!config) {
    throw new Error('MaptilerConfig is not provided');
  }
  return config;
}
