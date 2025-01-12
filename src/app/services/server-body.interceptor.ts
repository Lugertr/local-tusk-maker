import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { catchError, filter, map, Observable } from 'rxjs';
import { WhServerBody } from '@shared/declarations';
import { handleWhHttpError } from '@shared/functions';

@Injectable()
export class ServerBodyInterceptor implements HttpInterceptor {
  intercept(request: HttpRequest<WhServerBody<unknown>>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      filter(httpEvent => httpEvent instanceof HttpResponse),
      map(httpEvent => <HttpResponse<WhServerBody<unknown>>>httpEvent),
      map(httpResponse => {
        if (httpResponse.body instanceof Object && httpResponse.body.hasOwnProperty('data')) {
          return httpResponse.clone({
            body: httpResponse.body?.data,
          });
        }

        return httpResponse;
      }),
      catchError(handleWhHttpError),
    );
  }
}
