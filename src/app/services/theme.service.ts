import { Inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { DOCUMENT } from '@angular/common';

export type Theme = 'dark' | 'light';
export type Colors = 'textColor' | 'backgroundColor' | 'grayColor' | 'lightGrayColor' | 'primaryColor';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private readonly THEME_KEY: Theme = 'light';
  private themeSubject$ = new BehaviorSubject<Theme>((localStorage.getItem(this.THEME_KEY) as Theme) || 'dark');
  get theme$(): Observable<Theme> {
    return this.themeSubject$.asObservable();
  }

  constructor(@Inject(DOCUMENT) private document: Document) {}

  setTheme(theme: Theme): void {
    this.themeSubject$.next(theme);
    localStorage.setItem(this.THEME_KEY, theme);
  }

  getTheme(): Theme {
    return this.themeSubject$.value;
  }

  getColors(): Record<Colors, string> {
    const computedStyles = getComputedStyle(document.body);
    return {
      textColor: computedStyles.getPropertyValue('--text-color'),
      backgroundColor: computedStyles.getPropertyValue('--background-color'),
      grayColor: computedStyles.getPropertyValue('--gray-color'),
      lightGrayColor: computedStyles.getPropertyValue('--light-gray-color'),
      primaryColor: computedStyles.getPropertyValue('--primary-color'),
    };
  }
}
