import type { ElbStyleOption } from '@elbe/ui/map';

export const mapStyles = `/*  styles.css */
@import 'maplibre-gl/dist/maplibre-gl.css' layer(components);
`;

export const mapStyleOptions: ElbStyleOption[] = [
  { value: 'streets', label: 'Streets', icon: 'lucideMap' },
  { value: 'satellite-hybrid', label: 'Satellite', icon: 'lucideSatellite' },
  { value: 'ocean', label: 'Ocean', icon: 'lucideWaves' },
];
