import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { TokenStore } from '../../features/auth/session/store/token.store';
import { inject } from '@angular/core';
import { catchError, tap, throwError } from 'rxjs';
import { Router } from '@angular/router';

export const authInterceptorInterceptor: HttpInterceptorFn = (req, next) => {
  
  const tokenStore = inject(TokenStore);
  const authHeader = tokenStore.authorizationHeader();
  const publicEndpoints = ['/logins'];
  const isPublicEndpoint = publicEndpoints.some((endpoint) => req.url.includes(endpoint));
  const router = inject(Router);
  
  if (authHeader && !isPublicEndpoint) {
    req = req.clone({
      setHeaders: {
        Authorization: authHeader,
      },
    });
  }
  
  return next(req).pipe(
    tap((response) => {
      console.log('Response ', response);
    }),
    catchError((error: HttpErrorResponse) => {
      router.navigate(['/login']);
      return throwError(() => error);
    }),
  );
};
