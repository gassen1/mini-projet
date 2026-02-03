import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <nav class="navbar">
      <div class="navbar-container">
        <div class="navbar-brand">
          <a routerLink="/">🏸 Padel Reservation</a>
        </div>
        <div class="navbar-menu">
          <ng-container *ngIf="!isAuthenticated">
            <a routerLink="/login" class="navbar-link">Connexion</a>
            <a routerLink="/register" class="navbar-link">Inscription</a>
          </ng-container>
          <ng-container *ngIf="isAuthenticated">
            <ng-container *ngIf="isAdmin">
              <a routerLink="/admin" class="navbar-link">Admin</a>
              <a routerLink="/admin/terrains" class="navbar-link">Terrains</a>
              <a routerLink="/admin/creneaux" class="navbar-link">Créneaux</a>
              <a routerLink="/admin/promotions" class="navbar-link">Promotions</a>
              <a routerLink="/admin/reservations" class="navbar-link">Réservations</a>
            </ng-container>
            <ng-container *ngIf="!isAdmin">
              <a routerLink="/dashboard" class="navbar-link">Mon Tableau de Bord</a>
              <a routerLink="/reservations/new" class="navbar-link">Nouvelle Réservation</a>
              <a routerLink="/profile" class="navbar-link">Mon Profil</a>
            </ng-container>
            <span class="navbar-user">{{ currentUser?.prenom }} {{ currentUser?.nom }}</span>
            <button (click)="logout()" class="btn btn-secondary btn-sm">Déconnexion</button>
          </ng-container>
        </div>
      </div>
    </nav>
  `,
  styles: [`
    .navbar {
      background: white;
      box-shadow: var(--shadow);
      padding: 1rem 0;
      position: sticky;
      top: 0;
      z-index: 100;
    }

    .navbar-container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 2rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .navbar-brand a {
      font-size: 1.25rem;
      font-weight: 700;
      color: var(--primary-color);
      text-decoration: none;
    }

    .navbar-menu {
      display: flex;
      align-items: center;
      gap: 1.5rem;
    }

    .navbar-link {
      color: var(--gray-700);
      text-decoration: none;
      font-weight: 500;
      transition: color 0.2s;
    }

    .navbar-link:hover {
      color: var(--primary-color);
    }

    .navbar-user {
      color: var(--gray-600);
      font-size: 0.875rem;
    }

    .btn-sm {
      padding: 0.375rem 0.75rem;
      font-size: 0.875rem;
    }
  `]
})
export class NavbarComponent implements OnInit {
  private authService = inject(AuthService);
  private router = inject(Router);

  isAuthenticated = false;
  isAdmin = false;
  currentUser: User | null = null;

  ngOnInit(): void {
    this.authService.currentUser$.subscribe(user => {
      this.currentUser = user;
      this.isAuthenticated = this.authService.isAuthenticated();
      this.isAdmin = this.authService.isAdmin();
    });

    // Vérifier l'état initial
    this.isAuthenticated = this.authService.isAuthenticated();
    this.isAdmin = this.authService.isAdmin();
    this.currentUser = this.authService.getCurrentUser();

    // Si l'utilisateur est connecté mais le profil n'est pas chargé, le charger
    if (this.isAuthenticated && !this.currentUser) {
      this.authService.loadUserProfile();
    }
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
