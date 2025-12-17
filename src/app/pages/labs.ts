import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideFlaskConical } from '@ng-icons/lucide';
import { HlmBadgeImports } from '@spartan-ng/helm/badge';
import { HlmButtonImports } from '@spartan-ng/helm/button';
import { BaseLayout } from '../layouts/base.layout';
import { H2, H3 } from '../ui/heading';
import { Preview } from '../ui/preview';
import { code, link } from '../ui/typography';
import { AnimateCountPreview } from './components/motion/animate-count.preview';
import { AnimateEnterExitPreview } from './components/motion/animate-enter-exit.preview';
import { AnimateEnterPreview } from './components/motion/animate-enter.preview';
import { AnimateHoverPressPreview } from './components/motion/animate-hover-press.preview';
import { AnimateRotatePreview } from './components/motion/animate-rotate.preview';
import { AnimateTypePreview } from './components/motion/animate-type.preview';
import { AnimateWavePreview } from './components/motion/animate-wave.preview';

@Component({
  selector: 'elb-dev-page',
  imports: [
    BaseLayout,
    Preview,
    HlmButtonImports,
    HlmBadgeImports,
    NgIcon,
    H2,
    H3,
    AnimateTypePreview,
    AnimateWavePreview,
    AnimateRotatePreview,
    AnimateHoverPressPreview,
    AnimateCountPreview,
    AnimateEnterPreview,
    AnimateEnterExitPreview,
  ],
  providers: [provideIcons({ lucideFlaskConical })],
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
        <elb-h2 id="motion">@elbe-ui/motion</elb-h2>

        <p class="text-muted-foreground mt-3">
          @elbe-ui/motion directives are powered by
          <a href="https://motion.dev/" target="_blank" rel="noopener noreferrer" class="${link}"
            >motion</a
          >
          and use Angular <code class="${code}">animate.enter</code> and
          <code class="${code}">animate.leave</code> for enter and exit
          <a
            href="https://angular.dev/guide/animations"
            target="_blank"
            rel="noopener noreferrer"
            class="${link}"
            >animations</a
          >.
        </p>

        <elb-h3 id="animate">Animate</elb-h3>
        <elb-preview>
          <elb-animate-rotate-preview />
        </elb-preview>

        <elb-h3 id="animate-spring-tween">Spring and tween animation</elb-h3>
        <elb-preview>
          <elb-animate-type-preview />
        </elb-preview>

        <elb-h3 id="hover-press">Hover / Press</elb-h3>
        <elb-preview>
          <elb-animate-hover-press-preview />
        </elb-preview>

        <elb-h3 id="count">Count</elb-h3>
        <elb-preview>
          <elb-animate-count-preview />
        </elb-preview>

        <elb-h3 id="enter-exit">Enter animation</elb-h3>
        <elb-preview>
          <elb-animate-enter-preview />
        </elb-preview>

        <elb-h3 id="enter-exit">Enter / Exit</elb-h3>
        <elb-preview>
          <elb-animate-enter-exit-preview />
        </elb-preview>

        <elb-h3 id="wave">Wave Animation</elb-h3>
        <elb-preview>
          <elb-animate-wave-preview />
        </elb-preview>
      </div>
    </elb-base-layout>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LabsPage {}
