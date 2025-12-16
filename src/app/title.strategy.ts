import { ClassProvider, inject, Injectable } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { RouterStateSnapshot, TitleStrategy } from '@angular/router';
import { config } from './config';

@Injectable()
export class AppTitleStrategy extends TitleStrategy {
  private readonly title = inject(Title);

  updateTitle(snapshot: RouterStateSnapshot): void {
    // PageTitle is equal to the "Title" of a route if it's set
    // If its not set it will use the "title" given in index.html
    const pageTitle = this.buildTitle(snapshot);

    let title = [config.name];
    if (pageTitle) {
      title.unshift(pageTitle);
    } else {
      title.push(config.description);
    }

    this.title.setTitle(title.join(' - '));
  }
}

export function provideTitleStrategy(): ClassProvider {
  return { provide: TitleStrategy, useClass: AppTitleStrategy };
}
