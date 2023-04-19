import { Routes } from '@angular/router';

export const appRoutes: Routes = [
    {
        path: 'home',
        loadComponent: () => import('./home/home.page').then(p => p.HomePage)
    },
    {
        path: 'recipe/:id',
        loadComponent: () => import('./recipe/recipe.page').then(p => p.RecipePage)
    },
    {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
    },
]