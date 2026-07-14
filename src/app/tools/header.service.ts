import { DOCUMENT } from '@angular/common';
import { inject, Service } from '@angular/core';
import { environment } from '../../environments/environment';

@Service()
export class HeaderService {
  private readonly document = inject(DOCUMENT);

  /**
   * Sets the canonical link in the header.
   * It supposes the header link is already present in the index.html
   */
  setCanonical(absolutePath: string): void {
    const pathWithoutFragment = this.normalizePath(absolutePath).split('#')[0];
    const fullPath = `${environment.appUrl}/${pathWithoutFragment}`;
    this.document.querySelector('link[rel=canonical]')?.setAttribute('href', fullPath);
  }

  private normalizePath(path: string): string {
    if (path[0] === '/') {
      return path.substring(1);
    }
    return path;
  }
}
