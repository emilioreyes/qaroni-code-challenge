import { Routes } from '@angular/router';
import { loginGuard } from './core/guard/login-guard';
import { authGuard, authGuardChild } from './core/guard/auth-guard';
import { PersonForm } from './features/reactive-form/person-form/person-form';

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () =>
      import('./features/auth/login/pages/login-page/login-page').then((m) => m.LoginPage),
    canActivate: [loginGuard],
  },
  {
    path: 'home',
    canActivate: [authGuard],
    canActivateChild: [authGuardChild],
    loadComponent: () => import('./features/menu/home/home').then((m) => m.Home),
    children: [
      {
        path: 'news',
        loadComponent: () =>
          import('./features/news/list/pages/news-list-page/news-list-page').then(
            (m) => m.NewsListPage,
          ),
      },
      {
        path: 'groups',
        loadComponent: () =>
          import('./features/groups/list/pages/groups-list-page/groups-list-page').then(
            (m) => m.GroupsListPage,
          ),
      },
      {
        path: 'form',
        component: PersonForm,
      },
      { path: '', pathMatch: 'full', redirectTo: 'groups' },
    ],
  },
  { path: '', pathMatch: 'full', redirectTo: 'login' },
];
