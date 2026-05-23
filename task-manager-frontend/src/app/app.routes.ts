import { Routes } from '@angular/router';
import { Login } from './features/auth/login/login';
import { MainLayout } from './layout/main-layout/main-layout';
import { Dashboard } from './features/dashboard/dashboard';
import { Tasks } from './features/tasks/tasks';
import { Statistics } from './features/statistics/statistics';
import { Profile } from './features/profile/profile';

export const routes: Routes = [
  {
    path: 'login',
    component: Login,
  },

  {
    path: '',
    component: MainLayout, // contenedor principal
    children: [
      {
        path: 'dashboard',
        component: Dashboard,
      },

      {
        path: 'tasks',
        component: Tasks,
      },

      {
        path: 'statistics',
        component: Statistics,
      },

      {
        path: 'profile',
        component: Profile,
      },

      {
        path: '',
        redirectTo: 'tasks',
        pathMatch: 'full',
      },
    ],
  },

  {
    path: '**',
    redirectTo: 'tasks',
  },
];
