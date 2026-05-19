import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { LoginStore } from '../../features/auth/login/store/login.store';
import { TokenStore } from '../../features/auth/session/store/token.store';

export const loginGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const tokenStore = inject(TokenStore);
  const token = tokenStore.token();
  const expiresAt = tokenStore.expiresAt();
  if(!token || !expiresAt){
    return true;
  }

  return new Date(expiresAt).getTime() > Date.now()  ? router.createUrlTree(['/home/news']) : true;
};
