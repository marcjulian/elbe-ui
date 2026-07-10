import { NgOptimizedImage } from '@angular/common';
import { Component } from '@angular/core';
import { ElbDrawerImports } from '@elbe/ui/drawer';
import { HlmButtonImports } from '@spartan-ng/helm/button';
import { images } from '../gallery/images';

@Component({
  selector: 'elb-drawer-preview',
  imports: [ElbDrawerImports, HlmButtonImports, NgOptimizedImage],
  template: `
    <button hlmBtn (click)="drawer.open()">Open Drawer</button>

    <elb-drawer #drawer="elbDrawer">
      <div class="mx-auto w-full max-w-sm">
        <elb-drawer-header>
          <h2 elbDrawerTitle>Favorite Spot</h2>
          <p elbDrawerDescription>Save spot for later</p>
        </elb-drawer-header>

        <div class="p-4 pb-0">
          <img
            class="aspect-video rounded-md object-contain"
            [ngSrc]="image.previewUrl"
            [alt]="image.alt"
            [width]="image.previewWidth"
            [height]="image.previewHeight"
          />
        </div>

        <elb-drawer-footer>
          <button hlmBtn>Save</button>
          <button hlmBtn variant="outline">Cancel</button>
        </elb-drawer-footer>
      </div>
    </elb-drawer>
  `,
})
export class DrawerPreview {
  image = images[0];
}
