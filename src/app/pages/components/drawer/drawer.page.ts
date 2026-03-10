import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideEye, lucideGithub } from '@ng-icons/lucide';
import { HlmButtonImports } from '@spartan-ng/helm/button';
import { config } from '../../../config';
import { BaseLayout } from '../../../layouts/base.layout';
import { BlockPreview } from '../../../ui/block-preview';
import { H2, H3 } from '../../../ui/heading';
import { Preview } from '../../../ui/preview';
import { code, link } from '../../../ui/typography';
import { DrawerPreview } from './drawer.preview';

@Component({
  selector: 'elb-drawer-page',
  imports: [
    BaseLayout,
    HlmButtonImports,
    NgIcon,
    H2,
    H3,
    Preview,
    DrawerPreview,
    BlockPreview,
    RouterLink,
  ],
  providers: [provideIcons({ lucideGithub, lucideEye })],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <elb-base-layout mainClasses="pt-8">
      <div class="flex flex-col gap-2">
        <div class="flex justify-between">
          <h1 class="text-3xl font-semibold">Drawer</h1>
          <a
            hlmBtn
            variant="secondary"
            size="sm"
            href="${config.github}/tree/main/libs/elbe/drawer/src/lib"
            target="_blank"
            rel="noopener noreferrer"
          >
            Open in
            <ng-icon name="lucideGithub" />
          </a>
        </div>
        <p class="text-muted-foreground">Drawer component built with Cupertino Pane.</p>
      </div>

      <div elbPreview>
        <elb-drawer-preview />
      </div>

      <elb-h2 id="installation"> Installation </elb-h2>
      <div class="mt-2 flex flex-col gap-4">
        <p class="text-muted-foreground">
          The drawer component is built using the
          <a href="https://panejs.com/" target="_blank" rel="noopener noreferrer" class="${link}"
            >Cupertino Panes</a
          >
          library.
        </p>

        <p class="text-muted-foreground">
          Install <code class="${code}">npm install cupertino-pane</code>.
        </p>
      </div>

      <div class="flex items-baseline justify-between gap-6">
        <elb-h3 id="sidebar-drawer-mobile">Sidebar with Drawer on Mobile</elb-h3>

        <div class="flex items-center gap-1">
          <a [routerLink]="['/preview/sidebar-drawer']" hlmBtn variant="outline" size="icon-sm">
            <ng-icon name="lucideEye" />
          </a>
          <a
            hlmBtn
            variant="outline"
            size="sm"
            href="${config.github}/tree/main/src/app/pages/preview/sidebar-drawer-preview.page.ts"
            target="_blank"
            rel="noopener noreferrer"
          >
            Open in
            <ng-icon name="lucideGithub" />
          </a>
        </div>
      </div>

      <p class="text-muted-foreground mt-2">
        Copy
        <code class="${code}">hlm-sidebar</code> as
        <code class="${code}">hlm-sidebar-drawer</code> and replace
        <code class="${code}">hlm-sheet</code> with <code class="${code}">elb-drawer</code> (<a
          class="${link}"
          href="${config.github}/tree/main/src/app/pages/preview/hlm-sidebar-drawer.ts#L32-L39"
          target="_blank"
          rel="noopener noreferrer"
          >hlm-sidebar-drawer</a
        >).
      </p>

      <elb-block-preview name="sidebar-drawer" [showImagesOnMobile]="false" />
    </elb-base-layout>
  `,
})
export class DrawerPage {}
