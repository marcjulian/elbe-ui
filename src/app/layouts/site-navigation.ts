export type SiteNavigationItem = {
  name: string;
  /**
   * Path relative to the group's `basePath`, e.g. `gallery` -> `/components/gallery`.
   * Use an empty string to target the group root, e.g. `/labs`.
   */
  path: string;
  /**
   * Optional fragment, e.g. `charts` resolves to `/labs#charts`.
   * Kept separate from `path` because `routerLink="/labs#charts"` is treated
   * as a literal path segment rather than a fragment.
   */
  fragment?: string;
  icon: string;
  description: string;
  new?: boolean;
};

export type SiteNavigationGroup = {
  title: string;
  /** Absolute route prefix shared by the group's items, e.g. `/components`. */
  basePath: string;
  items: SiteNavigationItem[];
};

/**
 * Resolve an item to a router link array/string.
 * Group-root items (empty `path`) must use the base path alone, otherwise
 * `[basePath, '']` produces a trailing slash (`/labs/`) that does not match
 * the route on client-side navigation.
 */
export function navigationLink(
  group: SiteNavigationGroup,
  item: SiteNavigationItem,
): string | string[] {
  return item.path ? [group.basePath, item.path] : group.basePath;
}

export const siteNavigation: SiteNavigationGroup[] = [
  {
    title: 'Components',
    basePath: '/components',
    items: [
      {
        path: 'address-autocomplete',
        name: 'Address Autocomplete',
        icon: 'lucideSearch',
        description: 'Autocomplete with Maptiler Forward Geocoding.',
      },
      {
        path: 'drawer',
        name: 'Drawer',
        icon: 'lucidePanelTopClose',
        description: 'Drawer component built with Cupertino Panes library.',
      },
      {
        path: 'file-upload',
        name: 'File Upload',
        icon: 'lucideCloudUpload',
        description: 'File upload component built with ngx-primitives library.',
        new: true,
      },
      {
        path: 'gallery',
        name: 'Gallery',
        icon: 'lucideImages',
        description: 'Image gallery built with photoswipe library.',
      },
      {
        path: 'map',
        name: 'Map',
        icon: 'lucideMap',
        description: 'Map controls built for ngx-mapbox-gl library.',
      },
      {
        path: 'markdown',
        name: 'Markdown',
        icon: 'lucideFileText',
        description: 'Markdown renderer built with TanStack Markdown.',
        new: true,
      },
    ],
  },
  {
    title: 'Labs',
    basePath: '/labs',
    items: [
      {
        path: '',
        fragment: 'charts',
        name: 'Charts',
        icon: 'lucideFlaskConical',
        description: 'Experimental components and features.',
      },
    ],
  },
  {
    title: 'Tools',
    basePath: '/tools',
    items: [
      {
        path: 'seo',
        name: 'SEO',
        icon: 'lucideSearch',
        description: 'Route-driven titles, meta tags and canonical URLs.',
      },
      {
        path: 'theme',
        name: 'Theme',
        icon: 'lucideSunMoon',
        description: 'Light and dark themes with system preference detection.',
      },
    ],
  },
];
