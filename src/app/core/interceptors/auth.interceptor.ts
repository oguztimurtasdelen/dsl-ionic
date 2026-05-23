import {
    HttpErrorResponse,
    HttpEvent,
    HttpHandler,
    HttpInterceptor,
    HttpRequest
  } from '@angular/common/http';
  import { Injectable } from '@angular/core';
  import { Observable, catchError, from, switchMap, throwError, EMPTY } from 'rxjs';
  import { ApiService } from '../services/api.service';
  import { SessionService } from '../services/session.service';
  import { Router } from '@angular/router';
  
  @Injectable({ providedIn: 'root' })
  export class AuthInterceptor implements HttpInterceptor {
  
    private isRefreshing = false;
  
    constructor(
      private readonly sessionService: SessionService,
      private readonly apiService: ApiService,
      private readonly router: Router
    ) {}
  
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
  
      console.log('AuthInterceptor');
  
      const accessToken = this.sessionService.accessToken;
  
      let request = req;
  
      // ACCESS TOKEN ATTACH
      if (accessToken) {
        request = req.clone({
          setHeaders: {
            Authorization: `Bearer ${accessToken}`
          }
        });
      }
  
      return next.handle(request).pipe(
  
        catchError((error: HttpErrorResponse) => {
  
          // ONLY HANDLE TOKEN EXPIRED
          const isTokenExpired = error.status === 401 && error.error?.code === 'TOKEN_EXPIRED';
  
          const isRefreshCall = req.url.includes('/authentication/refresh');
  
          if (isTokenExpired && !isRefreshCall) {
  
            // prevent multiple refresh calls
            if (this.isRefreshing) {
              return EMPTY;
            }
  
            this.isRefreshing = true;
  
            return this.apiService.refreshToken().pipe(
  
              switchMap((response) => {
  
                return from(
                  this.sessionService.setAccessToken(response.accessToken)
                ).pipe(
  
                  switchMap(() => {
                    this.isRefreshing = false;
                    const retryRequest = req.clone({
                      setHeaders: {
                        Authorization: `Bearer ${response.accessToken}`
                      }
                    });
  
                    //  retry WITHOUT throwing error to UI
                    this.sessionService.loadCurrentUser();
                    return next.handle(retryRequest);
                  })
                );
              }),
  
              catchError((refreshError) => {
  
                this.isRefreshing = false;
  
                // real auth failure → logout
                this.sessionService.clearAccessToken();
                this.sessionService.clearCurrentUser();
                this.router.navigate(['/signin']);
  
                //  IMPORTANT: do NOT propagate UI error
                return EMPTY;
              })
            );
          }
  
          // real errors (500, 404 vs) go here
          return throwError(() => error);
        })
      );
    }
  }