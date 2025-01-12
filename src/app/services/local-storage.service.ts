import { isNotNil } from '@shared/functions';
import { Nullable } from '@shared/declarations';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  getItem<D>(key: string): Nullable<D> {
    if (this.hasItem(key)) {
      return JSON.parse(localStorage.getItem(key)!);
    }

    return null;
  }

  setItem<D>(key: string, data: D): void {
    localStorage.setItem(key, JSON.stringify(data));
  }

  hasItem(key: string): boolean {
    return isNotNil(localStorage.getItem(key));
  }
}
