import {
  computed,
  inject,
  Injectable,
  InjectionToken,
  signal,
  type Provider,
  type Signal,
} from '@angular/core';
import { ElbTheme } from '@elbe/ui/theme';

export interface MapStyleDefinition {
  light: string;
  /** Optional dark variant. Falls back to `light` when omitted. */
  dark?: string;
}

export interface MapStyleConfig {
  styles: Record<string, MapStyleDefinition>;
  defaultStyle: string;
}

export type MapStyleConfigFactory = () => MapStyleConfig;

const MapStyleConfigToken = new InjectionToken<MapStyleConfig>('MapStyleConfig');

export function provideMapStyleConfig(config: MapStyleConfig | MapStyleConfigFactory): Provider {
  return typeof config === 'function'
    ? { provide: MapStyleConfigToken, useFactory: config }
    : { provide: MapStyleConfigToken, useValue: config };
}

function injectMapStyleConfig(): MapStyleConfig {
  return inject(MapStyleConfigToken);
}

@Injectable({ providedIn: 'root' })
export class MapStyleService {
  private readonly _config = injectMapStyleConfig();
  private readonly _theme = inject(ElbTheme);
  private readonly _styleName = signal(this._config.defaultStyle);

  /** The currently selected style family, e.g. `streets`. */
  public readonly styleName = this._styleName.asReadonly();

  /** Resolves the selected style family for the current theme. */
  public readonly style = computed(() => {
    const definition = this._config.styles[this._styleName()];
    return this._theme.isDark() && definition.dark ? definition.dark : definition.light;
  });

  public setStyle(name: string): void {
    this._styleName.set(name);
  }
}

/** Resolves the configured map style for the current style family and theme. */
export function injectMapStyle(): Signal<string> {
  return inject(MapStyleService).style;
}
