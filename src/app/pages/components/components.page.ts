import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideChevronRight, lucideImages, lucideMap, lucidePanelTopClose } from '@ng-icons/lucide';
import { HlmItemImports } from '@spartan-ng/helm/item';
import { BaseLayout } from '../../layouts/base.layout';

type UiComponent = {
  slug: string;
  name: string;
  icon: string;
  description: string;
};

@Component({
  selector: 'elb-components',
  imports: [BaseLayout, NgIcon, HlmItemImports, RouterLink],
  providers: [provideIcons({ lucideImages, lucideMap, lucidePanelTopClose, lucideChevronRight })],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <elb-base-layout mainClasses="gap-10 flex flex-col min-h-[70vh]">
      <div class="text-center">
        <h1 class="text-4xl font-bold">Components</h1>
      </div>

      <div class="grid gap-4 sm:grid-cols-2">
        @for (component of components; track component.slug) {
          <a hlmItem [routerLink]="[component.slug]" variant="outline">
            <hlm-item-media variant="icon">
              <ng-icon [name]="component.icon" />
            </hlm-item-media>
            <hlm-item-content>
              <div hlmItemTitle>{{ component.name }}</div>
              <p hlmItemDescription>{{ component.description }}</p>
            </hlm-item-content>
            <hlm-item-actions>
              <ng-icon name="lucideChevronRight" />
            </hlm-item-actions>
          </a>
        }
      </div>
    </elb-base-layout>
  `,
})
export class ComponentsPage {
  components: UiComponent[] = [
    {
      slug: 'drawer',
      name: 'Drawer',
      icon: 'lucidePanelTopClose',
      description: 'Drawer component built with Cupertino Panes library.',
    },
    {
      slug: 'gallery',
      name: 'Gallery',
      icon: 'lucideImages',
      description: 'Image gallery built with photoswipe library.',
    },
    {
      slug: 'map',
      name: 'Map',
      icon: 'lucideMap',
      description: 'Map controls built for ngx-mapbox-gl library.',
    },
  ];
}
