import type { BooleanInput, NumberInput } from '@angular/cdk/coercion';
import {
  afterNextRender,
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  computed,
  DestroyRef,
  effect,
  inject,
  input,
  numberAttribute,
  signal,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import type { MarkdownHeading } from '@tanstack/markdown';

/** A heading with its resolved indentation for rendering. */
interface TocItem extends MarkdownHeading {
  /** Inline start padding, in rem, relative to the shallowest heading. */
  indent: number;
}

/**
 * Table of contents rendered from `ElbMarkdown.headings`, with scrollspy
 * highlighting the heading currently in view.
 */
@Component({
  selector: 'elb-markdown-toc',
  imports: [RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { 'data-slot': 'markdown-toc' },
  template: `
    @if (_items().length) {
      <nav
        [attr.aria-label]="hideLabel() ? label() : null"
        [attr.aria-labelledby]="hideLabel() ? null : _labelId"
      >
        @if (!hideLabel()) {
          <p [id]="_labelId" class="text-muted-foreground mb-2 text-xs font-medium uppercase">
            {{ label() }}
          </p>
        }
        <ol class="flex flex-col gap-1 text-sm">
          @for (item of _items(); track item.id) {
            <li [style.padding-inline-start.rem]="item.indent">
              <a
                [routerLink]="[]"
                [fragment]="item.id"
                [attr.aria-current]="activeId() === item.id ? 'location' : null"
                class="text-muted-foreground hover:text-foreground aria-[current=location]:text-foreground focus-visible:ring-ring/50 block rounded-sm py-1 transition-colors focus-visible:ring-2 focus-visible:outline-none aria-[current=location]:font-medium"
                (click)="activeId.set(item.id)"
              >
                {{ item.text }}
              </a>
            </li>
          }
        </ol>
      </nav>
    }
  `,
})
export class ElbMarkdownToc {
  private static _id = 0;

  /** Headings to render, e.g. from `ElbMarkdown.headings`. */
  public readonly headings = input.required<MarkdownHeading[]>();

  /** Shallowest heading level to include, e.g. `2` to skip the document title. */
  public readonly minLevel = input<number, NumberInput>(2, { transform: numberAttribute });

  /** Deepest heading level to include. */
  public readonly maxLevel = input<number, NumberInput>(6, { transform: numberAttribute });

  /** Accessible name for the navigation landmark and the visible title text. */
  public readonly label = input<string>('On this page');

  /** Hide the visible title above the list. */
  public readonly hideLabel = input<boolean, BooleanInput>(false, {
    transform: booleanAttribute,
  });

  /** Vertical inset (px) used to account for a sticky header. */
  public readonly offset = input<number, NumberInput>(96, { transform: numberAttribute });

  /**
   * Element to search for heading anchors in. Defaults to the whole document.
   * Pass a container when several markdown documents share a page.
   */
  public readonly root = input<Element | Document | null>(null);

  /** Id of the heading currently in view. */
  public readonly activeId = signal<string | null>(null);

  /** Id linking the navigation landmark to its visible title. */
  protected readonly _labelId = `elb-markdown-toc-${ElbMarkdownToc._id++}`;

  private readonly _filtered = computed<MarkdownHeading[]>(() => {
    const min = this.minLevel();
    const max = this.maxLevel();
    return this.headings().filter((heading) => heading.level >= min && heading.level <= max);
  });

  protected readonly _items = computed<TocItem[]>(() => {
    const headings = this._filtered();
    if (!headings.length) {
      return [];
    }
    const shallowest = Math.min(...headings.map((heading) => heading.level));
    return headings.map((heading) => ({
      ...heading,
      indent: Math.max(0, heading.level - shallowest) * 0.75,
    }));
  });

  private readonly _intersecting = new Set<string>();
  private _observer: IntersectionObserver | undefined;

  constructor() {
    afterNextRender(() => {
      this._createObserver();
      this._observe();
    });

    effect(() => {
      // Re-observe when the filtered headings or the search root change. No-op
      // until the observer exists, i.e. during SSR.
      this._filtered();
      this.root();
      this._observe();
    });

    inject(DestroyRef).onDestroy(() => this._observer?.disconnect());
  }

  private _createObserver(): void {
    this._observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const id = (entry.target as HTMLElement).id;
          if (entry.isIntersecting) {
            this._intersecting.add(id);
          } else {
            this._intersecting.delete(id);
          }
        }
        this._syncActive();
      },
      { rootMargin: `-${this.offset()}px 0px -70% 0px`, threshold: 0 },
    );
  }

  private _observe(): void {
    if (!this._observer) {
      return;
    }
    this._observer.disconnect();
    this._intersecting.clear();
    for (const heading of this._filtered()) {
      const element = this._findHeading(heading.id);
      if (element) {
        this._observer.observe(element);
      }
    }
    this._syncActive();
  }

  private _syncActive(): void {
    const headings = this._filtered();
    if (!headings.length) {
      this.activeId.set(null);
      return;
    }

    const intersecting = headings.find((heading) => this._intersecting.has(heading.id));
    if (intersecting) {
      this.activeId.set(intersecting.id);
      return;
    }

    // Fallback for the top and bottom of the page, where the active band is empty.
    const offset = this.offset();
    let candidate: string | null = null;
    for (const heading of headings) {
      const element = this._findHeading(heading.id);
      if (element && element.getBoundingClientRect().top <= offset) {
        candidate = heading.id;
      }
    }
    this.activeId.set(candidate ?? headings[0].id);
  }

  private _findHeading(id: string): HTMLElement | null {
    const root = this.root();
    const scope: ParentNode | null = root ? (root as ParentNode) : null;
    if (scope && scope !== document) {
      return scope.querySelector<HTMLElement>(`[id="${CSS.escape(id)}"]`);
    }
    return document.getElementById(id);
  }
}
