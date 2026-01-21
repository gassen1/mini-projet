import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { Role } from '../../models/user.model';
import { ThemeService } from '../../services/theme.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <nav class="navbar navbar-expand-lg sticky-top main-nav animate-fade-in">
      <div class="container">
        <a class="navbar-brand d-flex align-items-center" routerLink="/">
          <div class="logo-box me-2">
            <i class="fas fa-table-tennis"></i>
          </div>
          <span class="brand-text">PADEL<span class="text-primary">PRO</span></span>
        </a>
        
        <button class="navbar-toggler border-0 shadow-none" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span class="navbar-toggler-icon"></span>
        </button>
        
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav mx-auto">
            <li class="nav-item" *ngIf="isAdmin()">
              <a class="nav-link" routerLink="/admin" routerLinkActive="active">
                <i class="fas fa-user-shield me-1"></i> Admin Panel
              </a>
            </li>
            <li class="nav-item" *ngIf="isUser()">
              <a class="nav-link" routerLink="/dashboard" routerLinkActive="active">
                <i class="fas fa-th-large me-1"></i> Dashboard
              </a>
            </li>
          </ul>
          
          <div class="d-flex align-items-center gap-3">
            <!-- Dark Mode Toggle -->
            <button class="btn btn-theme-toggle rounded-circle p-2 d-flex align-items-center justify-content-center" (click)="toggleTheme()">
              <i class="fas" [class.fa-moon]="!(isDarkMode$ | async)" [class.fa-sun]="isDarkMode$ | async"></i>
            </button>

            <ng-container *ngIf="!isAuthenticated()">
              <a class="btn btn-login px-4" routerLink="/login">Sign In</a>
              <a class="btn btn-primary rounded-pill px-4 shadow-sm" routerLink="/register">Get Started</a>
            </ng-container>
            
            <div class="dropdown" *ngIf="isAuthenticated()">
              <button class="btn btn-user dropdown-toggle d-flex align-items-center gap-2 px-3 py-2 rounded-pill" type="button" (click)="isDropdownOpen = !isDropdownOpen">
                <div class="nav-avatar">{{ currentUserInitials }}</div>
                <span class="d-none d-md-inline small fw-bold">{{ currentUserEmail }}</span>
              </button>
              <ul class="dropdown-menu dropdown-menu-end shadow-lg border-0 rounded-3 mt-2" [class.show]="isDropdownOpen">
                <li><a class="dropdown-item py-2" routerLink="/profile" (click)="isDropdownOpen=false"><i class="fas fa-user-circle me-2 text-primary"></i> My Profile</a></li>
                <li><hr class="dropdown-divider opacity-10"></li>
                <li><a class="dropdown-item py-2" (click)="logout(); $event.preventDefault()" style="cursor: pointer;"><i class="fas fa-sign-out-alt me-2 text-danger"></i> Logout</a></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </nav>
  `,
  styles: [`
    .main-nav { background: rgba(255, 255, 255, 0.8); backdrop-filter: blur(15px); border-bottom: 1px solid var(--border-color); padding: 15px 0; z-index: 1000; transition: all 0.3s; }
    :host-context(.dark-mode) .main-nav { background: rgba(15, 23, 42, 0.8); }
    .btn-theme-toggle { background: #f1f2f6; color: #1a1c23; border: none; width: 40px; height: 40px; }
    :host-context(.dark-mode) .btn-theme-toggle { background: #1e293b; color: #f8fafc; }
    .brand-text { font-family: 'Outfit', sans-serif; font-weight: 900; font-size: 1.5rem; letter-spacing: -0.5px; color: var(--dark); }
    .logo-box { background: var(--primary); color: white; width: 35px; height: 35px; border-radius: 10px; display: flex; align-items: center; justify-content: center; transform: rotate(-10deg); transition: 0.3s; }
    .navbar-brand:hover .logo-box { transform: rotate(0deg) scale(1.1); }
    
    .nav-link { font-weight: 600; color: #6c757d; padding: 10px 20px !important; transition: 0.3s; border-radius: 8px; }
    .nav-link:hover { color: var(--primary); background: rgba(72, 52, 212, 0.05); }
    .nav-link.active { color: var(--primary); }
    
    .btn-login { font-weight: 600; color: var(--dark); border: none; }
    .btn-login:hover { color: var(--primary); }
    
    .btn-user { background: #f1f2f6; border: none; transition: 0.2s; }
    .btn-user:hover { background: #e1e2e6; }
    .nav-avatar { width: 30px; height: 30px; background: var(--primary); color: white; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 0.8rem; font-weight: bold; }
  `]
})
export class NavbarComponent {
  isDropdownOpen = false;
  isDarkMode$: Observable<boolean>;

  constructor(private authService: AuthService, private themeService: ThemeService) {
    this.isDarkMode$ = this.themeService.darkMode$;
  }

  toggleTheme() {
    this.themeService.toggleDarkMode();
  }

  get currentUserEmail() {
    return this.authService.currentUserValue?.email;
  }

  get currentUserInitials() {
    const email = this.currentUserEmail || '';
    return email.charAt(0).toUpperCase();
  }

  isAuthenticated() {
    return this.authService.isAuthenticated();
  }

  isAdmin() {
    return this.authService.isAdmin();
  }

  isUser() {
    return this.authService.isAuthenticated() && this.authService.currentUserValue?.role === Role.ADHERENT;
  }

  logout() {
    this.authService.logout();
    window.location.reload();
  }
}
