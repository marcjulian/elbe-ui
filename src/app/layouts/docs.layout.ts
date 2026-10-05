import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideKayak, lucideMenu, lucideX } from '@ng-icons/lucide';
import { HlmButtonImports } from '@spartan-ng/helm/button';
import {
  HlmSidebarImports,
  HlmSidebarService,
  provideHlmSidebarConfig,
} from '@spartan-ng/helm/sidebar';
import { Header } from '../ui/header';
import {
  siteNavigation,
  type SiteNavigationGroup,
  type SiteNavigationItem,
} from './site-navigation';

@Component({
  selector: 'elb-docs-layout',
  imports: [
    HlmSidebarImports,
    HlmButtonImports,
    Header,
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    NgIcon,
  ],
  providers: [
    provideIcons({ lucideMenu, lucideKayak, lucideX }),
    HlmSidebarService,
    provideHlmSidebarConfig({
      closeMobileSidebarOnMenuButtonClick: true,
      mobileBreakpoint: '64rem',
    }),
  ],
  template: `
    <div hlmSidebarWrapper class="flex-col">
      <elb-header>
        <button
          hlmBtn
          size="icon-sm"
          variant="ghost"
          class="lg:hidden"
          (click)="_sidebarService.toggleSidebar()"
        >
          <ng-icon name="lucideMenu" />
          <span class="sr-only">Toggle sidebar</span>
        </button>
      </elb-header>
      <div class="mx-auto flex w-full max-w-(--breakpoint-xl) flex-1">
        <hlm-sidebar
          class="bg-transparent **:data-[slot=sidebar-inner]:bg-transparent"
          sidebarContainerClass="top-(--header-height) h-[calc(100svh-var(--header-height))] data-[side=left]:left-[max(0px,calc((100%_-_var(--breakpoint-xl))/2))] data-[side=right]:right-[max(0px,calc((100%_-_var(--breakpoint-xl))/2))] group-data-[side=left]:border-r-0 group-data-[side=right]:border-l-0"
        >
          <hlm-sidebar-header class="flex-row items-center justify-between lg:hidden">
            <a
              routerLink="/"
              hlmBtn
              variant="ghost"
              size="sm"
              class="w-fit font-semibold"
              (click)="_sidebarService.setOpenMobile(false)"
            >
              <ng-icon name="lucideKayak" class="text-primary text-xl" />
              <span>elbe/<span class="text-primary">ui</span></span>
            </a>
            <button
              hlmBtn
              size="icon-sm"
              variant="ghost"
              (click)="_sidebarService.setOpenMobile(false)"
            >
              <ng-icon name="lucideX" />
              <span class="sr-only">Close sidebar</span>
            </button>
          </hlm-sidebar-header>
          <hlm-sidebar-content class="lg:pt-8">
            @for (group of siteNavigation; track group.title) {
              <hlm-sidebar-group>
                <div hlmSidebarGroupLabel>
                  {{ group.title }}
                </div>
                <div hlmSidebarGroupContent>
                  <ul hlmSidebarMenu>
                    @for (item of group.items; track item.path) {
                      <li hlmSidebarMenuItem>
                        <a
                          hlmSidebarMenuButton
                          class="font-medium"
                          [routerLink]="_link(group, item)"
                          [fragment]="item.fragment"
                          routerLinkActive
                          #rla="routerLinkActive"
                          [isActive]="rla.isActive"
                        >
                          <span>{{ item.name }}</span>
                        </a>
                      </li>
                    }
                  </ul>
                </div>
              </hlm-sidebar-group>
            }
          </hlm-sidebar-content>
        </hlm-sidebar>
        <main hlmSidebarInset>
          <div class="px-4 pt-8 pb-20">
            <router-outlet />
          </div>
        </main>
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DocsLayout {
  protected readonly _sidebarService = inject(HlmSidebarService);

  siteNavigation = siteNavigation;

  protected _link(group: SiteNavigationGroup, item: SiteNavigationItem): string | string[] {
    return item.path ? [group.basePath, item.path] : group.basePath;
  }
}
