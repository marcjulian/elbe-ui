import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { classes } from '@spartan-ng/helm/utils';
import { cva, VariantProps } from 'class-variance-authority';

const codeBlockLineVariants = cva(
  "before:text-muted-foreground after:text-muted-foreground relative -mx-4 block min-h-lh px-4 group-data-[size=sm]/code-block:-mx-3 group-data-[size=sm]/code-block:px-3 before:min-w-6 before:text-end after:absolute after:start-1 after:top-0 after:select-none in-data-numbered:col-span-2 in-data-numbered:grid in-data-numbered:grid-cols-subgrid in-data-numbered:gap-x-3 in-data-numbered:[counter-increment:line] in-data-numbered:before:content-[counter(line)] in-data-numbered:before:select-none in-data-numbered:supports-[content:counter(line)_/_'']:before:content-[counter(line)_/_'']",
  {
    variants: {
      variant: {
        default: '',
        added: "bg-muted after:content-['+']",
        removed: "bg-destructive/10 after:text-destructive after:content-['−']",
        highlighted: 'bg-muted',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
);

type CodeBlockLineVariants = VariantProps<typeof codeBlockLineVariants>;

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'span[hlmCodeBlockLine]',
  exportAs: 'hlmCodeBlockLine',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { 'data-slot': 'code-block-line', '[attr.data-variant]': 'variant()' },
  template: `
    <span data-slot="code-block-line-content" class="min-w-0">
      <ng-content />
    </span>
  `,
})
export class HlmCodeBlockLine {
  public readonly variant = input<CodeBlockLineVariants['variant']>('default');

  constructor() {
    classes(() => codeBlockLineVariants({ variant: this.variant() }));
  }
}
