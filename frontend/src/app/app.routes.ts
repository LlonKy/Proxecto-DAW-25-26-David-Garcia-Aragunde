import { Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';
import { noAuthGuard } from './guards/no-auth.guard';

export const routes: Routes = [
  {
    path: '',
    canActivate: [noAuthGuard],
    loadComponent: () => import('./pages/landing/landing.component').then(m => m.Landing)
  },
  {
    path: 'login',
    canActivate: [noAuthGuard],
    loadComponent: () => import('./pages/login/login.component').then(m => m.Login)
  },
  {
    path: 'register',
    canActivate: [noAuthGuard],
    loadComponent: () => import('./pages/register/register.component').then(m => m.Register)
  },
  {
    path: 'profile',
    redirectTo: 'profile/me',
    pathMatch: 'full'
  },
  {
    path: 'profile/:id',
    canActivate: [authGuard],
    loadComponent: () => import('./pages/profile/profile.component').then(m => m.Profile)
  },
  {
    path: 'skills',
    loadComponent: () => import('./pages/skills/skills.component').then(m => m.Skills)
  },
  {
    path: 'skills/new',
    canActivate: [authGuard],
    loadComponent: () => import('./pages/skills/skill-form/skill-form.component').then(m => m.SkillForm)
  },
  {
    path: 'skills/edit/:id',
    canActivate: [authGuard],
    loadComponent: () => import('./pages/skills/skill-form/skill-form.component').then(m => m.SkillForm)
  },
  {
    path: 'messages',
    loadComponent: () => import('./pages/messages/messages.component').then(m => m.MessagesComponent),
    canActivate: [authGuard]
  },
  {
   path: 'exchanges',
   canActivate: [authGuard],
   loadComponent: () => import('./pages/exchanges/exchanges.component').then(m => m.Exchanges)
  },
  {
    path: 'messages/:id',
    canActivate: [authGuard],
    loadComponent: () => import('./pages/messages/messages.component').then(m => m.MessagesComponent)
  },
  {
    path: '**',
    redirectTo: ''
  }
];