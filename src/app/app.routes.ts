import { Routes } from '@angular/router';

export const appRoutes: Routes = [
    {
        path: 'home',
        loadComponent: () => import('./home/home.page').then(p => p.HomePage)
    },
    {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
    },
]