import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideGithub } from '@ng-icons/lucide';
import { HlmButtonImports } from '@spartan-ng/helm/button';
import { config } from '../config';

@Component({
  selector: 'elb-header',
  imports: [RouterLink, NgIcon, HlmButtonImports],
  providers: [provideIcons({ lucideGithub })],
  template: `
    <header
      class="border-border bg-background/40 sticky top-0 z-10 flex h-(--header-height) items-center justify-between border-b px-4 backdrop-blur-lg"
    >
      <a routerLink="/" class="font-semibold"> elbe/<span class="text-primary">ui</span> </a>

      <nav>
        <a hlmBtn variant="ghost" href="${config.github}" target="_blank" rel="noopener noreferrer">
          <ng-icon name="lucideGithub" />
        </a>
      </nav>
    </header>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Header {}
