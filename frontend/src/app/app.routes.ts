import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        loadComponent: () => import('./pages/landing/landing.component').then(m => m.Landing)
    },
    {
        path: 'login',
        loadComponent: () => import('./pages/login/login.component').then(m => m.Login)
    },
    {
        path: 'register',
        loadComponent: () => import('./pages/register/register.component').then(m => m.Register)
    },
    {
        path: 'profile/:id',
        loadComponent: () => import('./pages/profile/profile.component').then(m => m.Profile)
    },
    {
        path: 'profile',
        redirectTo: 'profile/me',
        pathMatch: 'full'
    },
    {
        path: '',
        redirectTo: '',
        pathMatch: 'full'
    }
];