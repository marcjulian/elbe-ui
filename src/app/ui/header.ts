import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideGithub, lucideKayak, lucideMoon, lucideSun } from '@ng-icons/lucide';
import { HlmButtonImports } from '@spartan-ng/helm/button';
import { config } from '../config';
import { ThemeService } from '../utils/theme';

@Component({
  selector: 'elb-header',
  imports: [RouterLink, NgIcon, HlmButtonImports],
  providers: [provideIcons({ lucideGithub, lucideSun, lucideMoon, lucideKayak })],
  template: `
    <header
      class="bg-background/40 sticky top-0 z-10 flex h-(--header-height) items-center gap-2 px-4 backdrop-blur-lg"
    >
      <a routerLink="/" hlmBtn variant="ghost" size="sm" class="font-semibold">
        <ng-icon name="lucideKayak" class="text-primary text-xl" />
        <span>elbe/<span class="text-primary">ui</span></span>
      </a>

      <!-- TODO add main nav here -->
      <!-- <nav></nav> -->

      <div class="ml-auto flex gap-1">
        <a hlmBtn variant="ghost" href="${config.github}" target="_blank" rel="noopener noreferrer">
          <ng-icon name="lucideGithub" />
        </a>
        <button hlmBtn variant="ghost" (click)="_themeService.toggle()">
          <ng-icon name="lucideMoon" class="not-dark:hidden" />
          <ng-icon name="lucideSun" class="dark:hidden" />
        </button>
      </div>
    </header>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Header {
  protected _themeService = inject(ThemeService);
}
