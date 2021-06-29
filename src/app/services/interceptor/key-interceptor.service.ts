import { Injectable } from '@angular/core';
import { HttpHandler, HttpHeaders, HttpRequest } from '@angular/common/http';

import { from, Observable } from 'rxjs';
import { switchMap, timeout } from 'rxjs/operators';
import { Security } from 'src/app/config/security';

@Injectable()
export class KeyInterceptorService {

  constructor() { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<any> {
    return from(this.setKeyHeader(request)).pipe(
      switchMap((headers) => next.handle(request.clone({ headers })).pipe(timeout(Security.HTTP_REQUEST_TIMEOUT))
      ),
    );
  }

  private async setKeyHeader(request: HttpRequest<any>): Promise<HttpHeaders> {
    const key: string = Security.RAPID_KEY;
    let { headers } = request;
    headers = headers.set('X-RapidAPI-Key', key);
    return headers;
  }

}
