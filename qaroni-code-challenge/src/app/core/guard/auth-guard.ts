import { inject } from '@angular/core';
import { CanActivateChildFn, CanActivateFn, Router } from '@angular/router';
import { TokenStore } from '../../features/auth/session/store/token.store';

function checkGuard(){
const tokenStore = inject(TokenStore);
  const router = inject(Router);

  const token = tokenStore.token();
  const expiresAt = tokenStore.expiresAt();

  if (!token || !expiresAt) {
    return router.createUrlTree(['/login']);
  }

  return new Date(expiresAt).getTime() > Date.now() ? true : router.createUrlTree(['/login']);
}

export const authGuard: CanActivateFn = (route, state) => checkGuard();

export const authGuardChild: CanActivateChildFn = (route, state) => checkGuard();