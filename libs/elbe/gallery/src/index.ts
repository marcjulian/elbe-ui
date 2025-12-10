import { ElbGallery } from './lib/elb-gallery';
import { ElbGalleryItem } from './lib/elb-gallery-item';

export * from './lib/elb-gallery';
export * from './lib/elb-gallery-item';
export * from './lib/elb-gallery.token';

export const ElbGalleryImports = [ElbGallery, ElbGalleryItem] as const;
