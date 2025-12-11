import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideLink } from '@ng-icons/lucide';

@Component({
  selector: 'elb-h2',
  imports: [RouterLink, NgIcon],
  providers: [provideIcons({ lucideLink })],
  host: {
    class: 'flex items-center gap-2 group pt-(--header-height)',
  },
  template: `
    <h2 [id]="id()" class="text-2xl font-semibold">
      <ng-content />
    </h2>
    <a routerLink="." [fragment]="id()" class="inline-flex" aria-label="Link to heading">
      <span
        aria-hidden="true"
        class="hover:text-primary inline-flex [@media(hover:hover)]:opacity-0 transition-opacity group-hover:opacity-100"
      >
        <ng-icon name="lucideLink" />
      </span>
    </a>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class H2 {
  public readonly id = input.required<string>();
}

@Component({
  selector: 'elb-h3',
  imports: [RouterLink, NgIcon],
  providers: [provideIcons({ lucideLink })],
  host: {
    class: 'flex items-center gap-2 group pt-(--header-height)',
  },
  template: `
    <h3 [id]="id()" class="text-xl font-medium">
      <ng-content />
    </h3>
    <a routerLink="." [fragment]="id()" class="inline-flex" aria-label="Link to heading">
      <span
        aria-hidden="true"
        class="hover:text-primary inline-flex [@media(hover:hover)]:opacity-0 transition-opacity group-hover:opacity-100"
      >
        <ng-icon name="lucideLink" />
      </span>
    </a>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class H3 {
  public readonly id = input.required<string>();
}
