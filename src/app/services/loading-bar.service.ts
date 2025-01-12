import { Injectable } from '@angular/core';
import { BehaviorSubject, defer, finalize, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoadingBarService {
  show$: Observable<boolean>;

  private loaderSubject = new BehaviorSubject(false);
  private active = 0;

  constructor() {
    this.show$ = this.loaderSubject.asObservable();
  }

  show() {
    this.active++;
    this.loaderSubject.next(true);
  }

  hide() {
    this.active--;
    if (this.active < 1) {
      this.loaderSubject.next(false);
    }
  }

  withLoading<T>(): (src$: Observable<T>) => Observable<T> {
    return (src$: Observable<T>) =>
      defer(() => {
        this.show();
        return src$.pipe(
          finalize(() => {
            this.hide();
          }),
        );
      });
  }
}
