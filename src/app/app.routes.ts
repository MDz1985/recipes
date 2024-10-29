import { Routes } from '@angular/router';
import { canActivate, redirectLoggedInTo, redirectUnauthorizedTo } from '@angular/fire/auth-guard';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/recipes-list/recipes-list.component').then(c => c.RecipesListComponent),
    ...canActivate(() => redirectUnauthorizedTo('/login'))
  },
  { path: 'recipe/:id', loadComponent: () => import('./pages/recipe/recipe.component').then(c => c.RecipeComponent) },
  {
    path: 'login',
    loadComponent: () => import('./pages/auth/login/login.component').then(c => c.LoginComponent),
    ...canActivate(() => redirectLoggedInTo('/'))
  },
  {
    path: 'signup',
    loadComponent: () => import('./pages/auth/signup/signup.component').then(c => c.SignupComponent),
    ...canActivate(() => redirectLoggedInTo('/'))
  },
];
