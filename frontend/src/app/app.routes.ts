import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { UserDashboardComponent } from './components/user-dashboard/user-dashboard.component';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { AuthGuard } from './guards/auth.guard';
import { Role } from './models/user.model';

export const routes: Routes = [
    { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    {
        path: 'dashboard',
        component: UserDashboardComponent,
        canActivate: [AuthGuard],
        data: { roles: [Role.ADHERENT] }
    },
    {
        path: 'admin',
        component: AdminDashboardComponent,
        canActivate: [AuthGuard],
        data: { roles: [Role.ADMIN] }
    },
    {
        path: 'admin/promotions',
        loadComponent: () => import('./components/promotion-management/promotion-management.component').then(m => m.PromotionManagementComponent),
        canActivate: [AuthGuard],
        data: { roles: [Role.ADMIN] }
    },
    { path: '**', redirectTo: 'dashboard' }
];
