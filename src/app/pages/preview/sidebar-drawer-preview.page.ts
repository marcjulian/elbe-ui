import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgIcon, provideIcons } from '@ng-icons/core';
import {
  lucideBookOpen,
  lucideBot,
  lucideCommand,
  lucideSettings2,
  lucideSquareTerminal,
} from '@ng-icons/lucide';
import { HlmSidebarImports } from '@spartan-ng/helm/sidebar';
import { HlmSidebarDrawer } from './hlm-sidebar-drawer';

@Component({
  selector: 'elb-sidebar-drawer-preview-page',
  imports: [HlmSidebarImports, NgIcon, RouterLink, HlmSidebarDrawer],
  providers: [
    provideIcons({
      lucideCommand,
      lucideSquareTerminal,
      lucideBot,
      lucideBookOpen,
      lucideSettings2,
    }),
  ],
  template: `
    <div hlmSidebarWrapper>
      <hlm-sidebar-drawer variant="inset">
        <hlm-sidebar-header>
          <ul hlmSidebarMenu>
            <li hlmSidebarMenuItem>
              <a hlmSidebarMenuButton size="lg" href="#">
                <div
                  class="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg"
                >
                  <ng-icon name="lucideCommand" class="text-base" />
                </div>
                <div class="grid flex-1 text-left text-sm leading-tight">
                  <span class="truncate font-medium">Acme Inc</span>
                  <span class="truncate text-xs">Enterprise</span>
                </div>
              </a>
            </li>
          </ul>
        </hlm-sidebar-header>

        <hlm-sidebar-group>
          <div hlmSidebarGroupLabel>Platform</div>
          <ul hlmSidebarMenu>
            @for (item of items; track $index) {
              <li hlmSidebarMenuItem>
                <a hlmSidebarMenuButton [routerLink]="item.url">
                  <ng-icon [name]="item.icon" />
                  {{ item.title }}
                </a>
              </li>
            }
          </ul></hlm-sidebar-group
        >
      </hlm-sidebar-drawer>
      <main hlmSidebarInset>
        <header class="flex h-12 items-center justify-between px-4">
          <button hlmSidebarTrigger></button>
        </header>
        <div class="flex flex-1 flex-col gap-4 p-4">
          <div class="grid auto-rows-min gap-4 md:grid-cols-3">
            <div class="bg-muted aspect-video rounded-xl"></div>
            <div class="bg-muted aspect-video rounded-xl"></div>
            <div class="bg-muted aspect-video rounded-xl"></div>
          </div>
          <div class="bg-muted min-h-screen flex-1 rounded-xl md:min-h-min"></div>
        </div>
      </main>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SidebarDrawerPreviewPage {
  items: { title: string; url: string; icon: string; isActive?: boolean }[] = [
    {
      title: 'Playground',
      url: '.',
      icon: 'lucideSquareTerminal',
      isActive: true,
    },
    {
      title: 'Models',
      url: '.',
      icon: 'lucideBot',
    },
    {
      title: 'Documentation',
      url: '.',
      icon: 'lucideBookOpen',
    },
    {
      title: 'Settings',
      url: '.',
      icon: 'lucideSettings2',
    },
  ];
}
