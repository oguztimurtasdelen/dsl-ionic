import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
  },
  {
    path: '',
    redirectTo: 'signin',
    pathMatch: 'full',
  },
  {
    path: 'signup',
    loadComponent: () => import('./modules/auth/pages/signup/signup.page').then( m => m.SignupPage)
  },
  {
    path: 'signin',
    loadComponent: () => import('./modules/auth/pages/signin/signin.page').then( m => m.SigninPage)
  },
  {
    path: 'create-profile',
    loadComponent: () => import('./modules/profile/pages/create-profile/create-profile').then( m => m.CreateProfilePage)
  },
  {
    path: 'training-list',
    loadComponent: () => import('./modules/training/pages/training-list/training-list.page').then( m => m.TrainingListPage)
  },
  {
    path: 'training-detail/:id',
    loadComponent: () => import('./modules/training/pages/training-detail/training-detail.page').then( m => m.TrainingDetailPage)
  },

];
