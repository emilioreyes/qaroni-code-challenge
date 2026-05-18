import { Routes } from '@angular/router';
import { loginGuard } from './core/guard/login-guard';

export const routes: Routes = [
    {
        path: '',
        loadComponent: () => import('./features/auth/login/pages/login-page/login-page').then(m => m.LoginPage),
        canActivate: [loginGuard],
    },{
        path: 'list',
        loadComponent: () => import('./features/news/list/pages/news-list-page/news-list-page').then(m => m.NewsListPage),
    },{
        path:'groups',
        loadComponent: () => import('./features/groups/list/pages/groups-list-page/groups-list-page').then(m => m.GroupsListPage),
    }

];
