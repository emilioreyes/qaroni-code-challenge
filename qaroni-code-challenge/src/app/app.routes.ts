import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        loadComponent: () => import('./features/auth/login/pages/login-page/login-page').then(m => m.LoginPage)
    }
];
