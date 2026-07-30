import { isPlatformBrowser } from '@angular/common';
import { computed, DOCUMENT, inject, PLATFORM_ID, Service, signal } from '@angular/core';

type Theme = 'light' | 'dark' | 'system-light' | 'system-dark';

@Service()
export class ThemeService {
  private static readonly THEME_KEY = 'theme';

  private readonly platform = inject(PLATFORM_ID);
  private readonly _document = inject(DOCUMENT);
  private readonly _theme = signal<Theme>('system-light');

  public readonly isDark = computed(
    () => this._theme() === 'dark' || this._theme() === 'system-dark',
  );

  constructor() {
    if (isPlatformBrowser(this.platform)) {
      const theme = localStorage.getItem(ThemeService.THEME_KEY) as Theme | null;
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

      this.setTheme(theme ?? (mediaQuery.matches ? 'system-dark' : 'system-light'));
      // Listen for system preference changes — but only apply when
      // the user hasn't made an explicit choice (system-* themes).
      mediaQuery.addEventListener('change', ({ matches }) => {
        const current = this._theme();
        if (current === 'system-light' || current === 'system-dark') {
          this.setTheme(matches ? 'system-dark' : 'system-light');
        }
      });
    }
  }

  setTheme(theme: Theme) {
    this._theme.set(theme);

    if (theme === 'light' || theme === 'dark') {
      localStorage.setItem('theme', theme);
    }

    switch (theme) {
      case 'light':
      case 'system-light':
        this._document.documentElement.classList.remove('dark');
        break;
      case 'dark':
      case 'system-dark':
        this._document.documentElement.classList.add('dark');
        break;
    }

    // Keep the iOS browser chrome (address bar / safe areas) in sync.
    this._document
      .querySelector('meta[name="theme-color"]')
      ?.setAttribute('content', this.isDark() ? '#0a0a0a' : '#ffffff');
  }

  toggle() {
    this.setTheme(this.isDark() ? 'light' : 'dark');
  }
}
