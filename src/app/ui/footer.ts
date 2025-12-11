import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'elb-footer',
  imports: [],
  template: `
    <footer class="flex flex-col items-center gap-4 px-4 py-10">
      <a href="https://paddlingspots.com" target="_blank" rel="noopener noreferrer">
        <img src="/paddlingspots-logo.svg" alt="Paddlingspots" class="h-8" />
      </a>
      <p class="text-muted-foreground text-center text-sm">
        &copy; {{ year }} elbe/ui. Built by
        <a href="https://marcjulian.de" class="underline" target="_blank" rel="noopener noreferrer"
          >marcjulian</a
        >.
      </p>
    </footer>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Footer {
  year = new Date().getFullYear();
}
