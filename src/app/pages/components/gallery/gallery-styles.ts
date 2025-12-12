export const galleryStyles = `/*  styles.css */
@import "photoswipe/photoswipe.css" layer(components);

@theme inline {
  --color-gallery: var(--gallery);
  --color-gallery-foreground: var(--gallery-foreground);
}

:root {
  --gallery: oklch(0.439 0 0);
  --gallery-foreground: oklch(1 0 0);
}

:root.dark {
  --gallery: oklch(0.439 0 0);
  --gallery-foreground: oklch(1 0 0);
}
`;
