import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Directive, effect, ElementRef, inject, input } from '@angular/core';
import { classes } from '@spartan-ng/helm/utils';
import { marked } from 'marked';
import { firstValueFrom } from 'rxjs';

@Directive({
  selector: '[elbMarkdown],elb-markdown',
})
export class ElbMarkdown implements AfterViewInit {
  private readonly _element = inject(ElementRef<HTMLElement>);
  private readonly _http = inject(HttpClient);

  public readonly content = input<string>();
  public readonly src = input<string>();

  constructor() {
    classes(() => 'typeset');

    effect(() => {
      const markdown = this.content();
      if (markdown) {
        this.render(markdown);
      }
    });

    effect(async () => {
      const sourceFile = this.src();
      if (sourceFile) {
        const markdown = await this.loadSource(sourceFile);
        this.render(markdown);
      }
    });
  }

  ngAfterViewInit(): void {
    if (!this.content() && !this.src()) {
      const markdown = this._element.nativeElement.innerHTML;
      this.render(markdown);
    }
  }

  private async loadSource(sourceFile: string): Promise<string> {
    return firstValueFrom(this._http.get(sourceFile, { responseType: 'text' }));
  }

  private async render(markdown: string): Promise<void> {
    const html = await marked.parse(markdown);
    this._element.nativeElement.innerHTML = html;
  }
}
