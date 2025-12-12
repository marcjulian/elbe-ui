import { afterNextRender, DOCUMENT, inject, Injectable, signal } from '@angular/core';

const Theme = ['dark', 'light'] as const;
type Theme = (typeof Theme)[number];

@Injectable({ providedIn: 'root' })
export class ThemeService {
  private readonly _document = inject(DOCUMENT);
  private _theme = signal<Theme | undefined>(undefined);
  public readonly theme = this._theme.asReadonly();

  constructor() {
    afterNextRender(() => {
      this.syncTheme();
    });
  }

  private themePreference(): Theme {
    const theme = localStorage.getItem('theme');
    if (theme && Theme.includes(theme as Theme)) {
      return theme as Theme;
    }
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }

  private syncTheme() {
    this._theme.set(this.themePreference());
  }

  public toggle() {
    const newTheme = this._theme() === 'dark' ? 'light' : 'dark';
    this._theme.set(newTheme);
    this._document.documentElement.classList.toggle('dark', newTheme === 'dark');
    localStorage.setItem('theme', newTheme);
  }
}
