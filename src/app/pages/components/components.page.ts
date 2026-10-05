import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgIcon, provideIcons } from '@ng-icons/core';
import {
  lucideChevronRight,
  lucideCloudUpload,
  lucideFileText,
  lucideImages,
  lucideMap,
  lucidePanelTopClose,
  lucideSearch,
} from '@ng-icons/lucide';
import { HlmBadgeImports } from '@spartan-ng/helm/badge';
import { HlmItemImports } from '@spartan-ng/helm/item';
import { navigationLink, siteNavigation } from '../../layouts/site-navigation';

@Component({
  selector: 'elb-components',
  imports: [NgIcon, HlmBadgeImports, HlmItemImports, RouterLink],
  providers: [
    provideIcons({
      lucideImages,
      lucideMap,
      lucidePanelTopClose,
      lucideChevronRight,
      lucideSearch,
      lucideCloudUpload,
      lucideFileText,
    }),
  ],
  host: {
    class: 'flex flex-col gap-6',
  },
  template: `
    <div class="text-center">
      <h1 class="text-4xl font-bold">Components</h1>
      <p class="text-muted-foreground mx-auto mt-3 max-w-sm text-xl text-balance">
        All available elbe/ui components
      </p>
    </div>

    @if (_componentGroup; as group) {
      <div class="grid gap-4 sm:grid-cols-2">
        @for (item of group.items; track item.path) {
          <a hlmItem [routerLink]="_link(group, item)" variant="outline" class="items-start">
            <hlm-item-media variant="icon">
              <ng-icon [name]="item.icon" />
            </hlm-item-media>
            <hlm-item-content>
              <hlm-item-title>
                {{ item.name }}
                @if (item.new) {
                  <span hlmBadge variant="secondary">New</span>
                }
              </hlm-item-title>
              <p hlmItemDescription>{{ item.description }}</p>
            </hlm-item-content>
            <hlm-item-actions>
              <ng-icon name="lucideChevronRight" />
            </hlm-item-actions>
          </a>
        }
      </div>
    }
  `,
})
export class ComponentsPage {
  protected readonly _componentGroup = siteNavigation.find(
    (group) => group.basePath === '/components',
  );
  protected readonly _link = navigationLink;
}
