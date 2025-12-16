import { ChangeDetectionStrategy, Component, signal, viewChild } from '@angular/core';
import { Animate, Count, MotionImports } from '@elbe-ui/motion';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideFlaskConical, lucideRotateCcw } from '@ng-icons/lucide';
import { HlmBadgeImports } from '@spartan-ng/helm/badge';
import { HlmButtonImports } from '@spartan-ng/helm/button';
import { BaseLayout } from '../layouts/base.layout';
import { H2, H3 } from '../ui/heading';
import { Preview } from '../ui/preview';

@Component({
  selector: 'elb-dev-page',
  imports: [BaseLayout, Preview, MotionImports, HlmButtonImports, HlmBadgeImports, NgIcon, H2, H3],
  providers: [provideIcons({ lucideRotateCcw, lucideFlaskConical })],
  template: `
    <elb-base-layout>
      <div class="flex flex-col items-center justify-center gap-6 py-10">
        <div class="text-center">
          <span hlmBadge variant="secondary">
            <ng-icon name="lucideFlaskConical" />Experimental
          </span>
          <h1 class="mt-1 text-5xl font-bold">Labs</h1>
          <p class="text-muted-foreground mt-3 max-w-sm text-xl text-balance">
            A collection of experimental features for Angular.
          </p>
        </div>
      </div>

      <div class="flex flex-col">
        <elb-h2 id="motion">Motion</elb-h2>

        <elb-h3 id="animate">Animate</elb-h3>
        <elb-preview>
          <button
            hlmBtn
            variant="ghost"
            size="icon"
            class="absolute top-2 right-2"
            aria-label="Replay"
            (click)="animate().replay()"
          >
            <ng-icon name="lucideRotateCcw" />
          </button>
          <div
            class="size-25 shrink-0 rounded-md bg-pink-500"
            [animate]="{ rotate: 360 }"
            [transition]="{ duration: 1 }"
          ></div>
        </elb-preview>

        <elb-h3 id="hover-press">Hover / Press</elb-h3>
        <elb-preview>
          <div
            class="size-25 shrink-0 rounded-full bg-sky-500"
            [whileHover]="{ scale: 1.2 }"
            [whilePress]="{ scale: 0.8 }"
          ></div>
        </elb-preview>

        <elb-h3 id="count">Count</elb-h3>
        <elb-preview>
          <button
            hlmBtn
            variant="ghost"
            size="icon"
            class="absolute top-2 right-2"
            aria-label="Replay"
            (click)="count().toggle()"
          >
            <ng-icon name="lucideRotateCcw" />
          </button>
          <div class="text-6xl text-orange-500" count from="0" to="1000"></div>
        </elb-preview>

        <elb-h3 id="enter-exit">Enter animation</elb-h3>
        <elb-preview>
          <div
            id="ball"
            class="size-25 shrink-0 rounded-full bg-fuchsia-500"
            [initial]="{ opacity: 0, scale: 0 }"
            [animate]="{ opacity: 1, scale: 1 }"
            [transition]="{
              duration: 0.4,
              scale: { type: 'spring', visualDuration: 0.4, bounce: 0.5 },
            }"
          ></div>
        </elb-preview>
        <elb-h3 id="enter-exit">Enter / Exit</elb-h3>
        <elb-preview>
          @if (isVisible()) {
            <div
              id="box"
              class="bg-primary size-25 shrink-0 rounded-md"
              [initial]="{ opacity: 0, scale: 0 }"
              [animate]="{ opacity: 1, scale: 1 }"
              [exit]="{ opacity: 0, scale: 0 }"
            ></div>
          }
          <button hlmBtn class="absolute bottom-4 w-25" [whilePress]="{ y: 1 }" (click)="toggle()">
            {{ isVisible() ? 'Hide' : 'Show' }}
          </button>
        </elb-preview>
      </div>
    </elb-base-layout>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LabsPage {
  readonly animate = viewChild.required(Animate);
  readonly count = viewChild.required(Count);

  public isVisible = signal(true);

  toggle() {
    this.isVisible.set(!this.isVisible());
  }
}
