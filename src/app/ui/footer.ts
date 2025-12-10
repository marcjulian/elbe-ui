import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'elb-footer',
  imports: [],
  template: `
    <footer class="px-4 py-5">
      <p class="text-muted-foreground text-center text-sm">
        Built by
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
