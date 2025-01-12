import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';
import { Theme } from '@shared/declarations';

@Injectable({
  providedIn: 'root',
})
export class ThemeLoaderService {
  private readonly elementLinkMap = new Map<string, HTMLLinkElement>();
  private readonly headElement = this.document.getElementsByTagName('head')[0];

  constructor(@Inject(DOCUMENT) private readonly document: Document) {}

  apply(theme: Theme): void {
    this.setSrcToElementLink(theme);
  }

  remove(theme: Theme): void {
    const elementLink = this.getElementLinkByName(theme);

    this.headElement.removeChild(elementLink);
  }

  private setSrcToElementLink(theme: Theme): void {
    const elementLink = this.getElementLinkByName(theme);

    elementLink.href = `${theme}.css`;

    this.headElement.appendChild(elementLink);
  }

  private getElementLinkByName(theme: Theme): HTMLLinkElement {
    if (this.elementLinkMap.has(theme)) {
      return this.elementLinkMap.get(theme)!;
    }

    const newLinkElement = this.createLinkElement();

    this.elementLinkMap.set(theme, newLinkElement);

    return this.elementLinkMap.get(theme)!;
  }

  private createLinkElement(): HTMLLinkElement {
    const themeLinkElement = this.document.createElement('link');

    themeLinkElement.rel = 'stylesheet';

    return themeLinkElement;
  }
}
