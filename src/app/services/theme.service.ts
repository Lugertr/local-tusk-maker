import { inject, Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { Theme } from '../shared/types';

export type Colors = 'textColor' | 'backgroundColor' | 'grayColor' | 'lightGrayColor' | 'primaryColor';
export const DEF_THEME = Theme.Night;
export const ALT_THEME = Theme.Winter;
@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private readonly platform = inject(PLATFORM_ID);

  private readonly THEME_KEY = 'theme';
  private themeSubject$ = new BehaviorSubject<Theme>(DEF_THEME);
  get theme$(): Observable<Theme> {
    return this.themeSubject$.asObservable();
  }

  get isDefTheme(): boolean {
    return this.getTheme() === DEF_THEME;
  }

  constructor(@Inject(DOCUMENT) private document: Document) {
    if (isPlatformBrowser(this.platform)) {
      try {
        const userTheme = localStorage.getItem(this.THEME_KEY) as Theme;
        if (this.getTheme() !== userTheme && Object.values(Theme).includes(userTheme)) {
          this.themeSubject$.next(userTheme)
        }
      } catch (error) {
        console.warn('Ошибка с LocalStorage');
      }
    }
  }

  setTheme(theme: Theme): void {
    this.themeSubject$.next(theme);
    localStorage.setItem(this.THEME_KEY, theme);
  }

  getTheme(): Theme {
    return this.themeSubject$.value;
  }

  getColors(): Record<Colors, string> {
    const computedStyles = getComputedStyle(this.document.body);
    return {
      textColor: computedStyles.getPropertyValue('--text-color'),
      backgroundColor: computedStyles.getPropertyValue('--background-color'),
      grayColor: computedStyles.getPropertyValue('--gray-color'),
      lightGrayColor: computedStyles.getPropertyValue('--light-gray-color'),
      primaryColor: computedStyles.getPropertyValue('--primary-color'),
    };
  }
}
