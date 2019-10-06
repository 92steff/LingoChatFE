import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as AuthSelectors from './store/auth.selectors';
import * as fromApp from '../store/app.reducers';
import { AuthTokens } from '../models/authTokens.model';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptor implements HttpInterceptor {

  constructor(private store: Store<fromApp.AppState>) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.store.select(AuthSelectors.selectToken)
      .subscribe((tokens: AuthTokens) => {
        if (tokens) {
          request = request.clone({
            setHeaders: {
              Authorization: `Bearer ` + tokens.accessToken
            }
          })
        }
      })

  return next.handle(request);

  }
}
