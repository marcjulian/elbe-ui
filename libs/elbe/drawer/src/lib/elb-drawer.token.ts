import { InjectionToken, ValueProvider, inject } from '@angular/core';
import { type CupertinoSettings } from 'cupertino-pane';

export type DrawerOptions = Omit<CupertinoSettings, 'events'>;

export interface ElbDrawerConfig {
  options: DrawerOptions;
}

const defaultConfig: ElbDrawerConfig = {
  options: {
    parentElement: 'body',
    fitHeight: true,
    backdrop: true,
    backdropOpacity: 0.5,
    bottomClose: true,
    buttonDestroy: false,
    cssClass:
      '[--cupertino-pane-background:var(--color-background)] [--cupertino-pane-color:var(--color-foreground)] [--cupertino-pane-border-radius:var(--radius-xl)] [--cupertino-pane-shadow:var(--shadow-lg)] [--cupertino-pane-move-background:var(--color-muted)] [&>.pane]:max-w-none!',
  },
};

const ElbDrawerConfigToken = new InjectionToken<ElbDrawerConfig>('ElbDrawerConfig');

export function provideElbDrawerConfig(config: Partial<ElbDrawerConfig>): ValueProvider {
  return {
    provide: ElbDrawerConfigToken,
    useValue: { ...defaultConfig, ...config },
  };
}

export function injectElbDrawerConfig(): ElbDrawerConfig {
  return inject(ElbDrawerConfigToken, { optional: true }) ?? defaultConfig;
}
