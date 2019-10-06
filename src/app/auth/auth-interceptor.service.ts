import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as AuthSelectors from './store/auth.selectors';
import * as fromApp from '../store/app.reducers';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorService implements HttpInterceptor {

  constructor(private store: Store<fromApp.AppState>) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let token: string;
    this.store.select(AuthSelectors.selectToken)
      .subscribe((tokens) => {
        token = tokens.accessToken;
        console.log('1')
      })
  
  if (token) {
    console.log('2')
    request = request.clone({
      setHeaders: {
        Authorization: `Basic ` + token
      }
    })
  }

  return next.handle(request);

  }
}
