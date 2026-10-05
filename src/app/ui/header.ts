import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ElbTheme } from '@elbe/ui/theme';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideKayak, lucideMoon, lucideSun } from '@ng-icons/lucide';
import { simpleGithub } from '@ng-icons/simple-icons';
import { HlmButtonImports } from '@spartan-ng/helm/button';
import { config } from '../config';

@Component({
  selector: 'elb-header',
  imports: [RouterLink, NgIcon, HlmButtonImports],
  providers: [provideIcons({ simpleGithub, lucideSun, lucideMoon, lucideKayak })],
  host: { class: 'sticky top-0 z-10' },
  template: `
    <header class="bg-background/40 backdrop-blur-lg">
      <div
        class="mx-auto flex h-(--header-height) w-full max-w-(--breakpoint-xl) items-center gap-2 px-4"
      >
        <ng-content />

        <a routerLink="/" hlmBtn variant="ghost" size="sm" class="font-semibold">
          <ng-icon name="lucideKayak" class="text-primary text-xl" />
          <span>elbe/<span class="text-primary">ui</span></span>
        </a>

        <nav>
          <a hlmBtn variant="ghost" size="sm" routerLink="/components">Components</a>
          <a hlmBtn variant="ghost" size="sm" routerLink="/labs">Labs</a>
        </nav>

        <div class="ml-auto flex gap-1">
          <a
            hlmBtn
            size="icon-sm"
            variant="ghost"
            href="${config.github}"
            target="_blank"
            rel="noopener noreferrer"
          >
            <ng-icon name="simpleGithub" />
          </a>
          <button hlmBtn size="icon-sm" variant="ghost" (click)="_themeService.toggle()">
            <ng-icon name="lucideMoon" class="dark:hidden" />
            <ng-icon name="lucideSun" class="not-dark:hidden" />
            <span class="sr-only">Toggle theme</span>
          </button>
        </div>
      </div>
    </header>
  `,
})
export class Header {
  protected _themeService = inject(ElbTheme);
}
