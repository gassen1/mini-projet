import { Routes } from '@angular/router';
import { authGuard, adminGuard } from './guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/dashboard',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadComponent: () => import('./components/login/login.component').then(m => m.LoginComponent)
  },
  {
    path: 'register',
    loadComponent: () => import('./components/register/register.component').then(m => m.RegisterComponent)
  },
  {
    path: 'dashboard',
    loadComponent: () => import('./components/user-dashboard/user-dashboard.component').then(m => m.UserDashboardComponent),
    canActivate: [authGuard]
  },
  {
    path: 'profile',
    loadComponent: () => import('./components/profile/profile.component').then(m => m.ProfileComponent),
    canActivate: [authGuard]
  },
  {
    path: 'reservations/new',
    loadComponent: () => import('./components/create-reservation/create-reservation.component').then(m => m.CreateReservationComponent),
    canActivate: [authGuard]
  },
  {
    path: 'admin',
    loadComponent: () => import('./components/admin-dashboard/admin-dashboard.component').then(m => m.AdminDashboardComponent),
    canActivate: [adminGuard]
  },
  {
    path: 'admin/terrains',
    loadComponent: () => import('./components/terrain-management/terrain-management.component').then(m => m.TerrainManagementComponent),
    canActivate: [adminGuard]
  },
  {
    path: 'admin/creneaux',
    loadComponent: () => import('./components/creneau-management/creneau-management.component').then(m => m.CreneauManagementComponent),
    canActivate: [adminGuard]
  },
  {
    path: 'admin/promotions',
    loadComponent: () => import('./components/promotion-management/promotion-management.component').then(m => m.PromotionManagementComponent),
    canActivate: [adminGuard]
  },
  {
    path: 'admin/reservations',
    loadComponent: () => import('./components/admin-reservations/admin-reservations.component').then(m => m.AdminReservationsComponent),
    canActivate: [adminGuard]
  },
  {
    path: '**',
    redirectTo: '/dashboard'
  }
];
