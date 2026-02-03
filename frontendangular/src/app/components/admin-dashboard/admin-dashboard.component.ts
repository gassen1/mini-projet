import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReservationService } from '../../services/reservation.service';
import { StatisticsService } from '../../services/statistics.service';
import { DashboardStats } from '../../models/dashboard-stats.model';
import { Statistics } from '../../models/dashboard-stats.model';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="admin-dashboard">
      <h1>Tableau de Bord Administrateur</h1>

      <div class="admin-nav mb-3">
        <a routerLink="/admin/terrains" class="btn btn-secondary">Gérer les Terrains</a>
        <a routerLink="/admin/creneaux" class="btn btn-secondary">Gérer les Créneaux</a>
        <a routerLink="/admin/promotions" class="btn btn-secondary">Gérer les Promotions</a>
        <a routerLink="/admin/reservations" class="btn btn-secondary">Toutes les Réservations</a>
      </div>

      <!-- Statistiques -->
      <div class="stats-grid mb-3">
        <div class="stat-card">
          <h3>Utilisateurs</h3>
          <div class="stat-value">{{ statistics.totalUsers }}</div>
        </div>
        <div class="stat-card">
          <h3>Réservations</h3>
          <div class="stat-value">{{ statistics.totalReservations }}</div>
        </div>
        <div class="stat-card">
          <h3>Revenus Totaux</h3>
          <div class="stat-value">{{ statistics.totalRevenue.toFixed(2) }} €</div>
        </div>
      </div>

      <!-- Statistiques détaillées -->
      <div *ngIf="dashboardStats" class="card mb-3">
        <h2>Statistiques Détaillées</h2>
        <div class="stats-details">
          <div>
            <h3>Réservations par statut</h3>
            <ul>
              <li *ngFor="let status of getStatusKeys(dashboardStats.reservationsByStatus)">
                {{ status }}: {{ dashboardStats.reservationsByStatus[status] }}
              </li>
            </ul>
          </div>
          <div>
            <h3>Revenus par mois</h3>
            <ul>
              <li *ngFor="let month of getMonthKeys(dashboardStats.revenueByMonth)">
                {{ month }}: {{ dashboardStats.revenueByMonth[month].toFixed(2) }} €
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .admin-dashboard {
      max-width: 1200px;
      margin: 0 auto;
      padding: 2rem;
    }

    .admin-nav {
      display: flex;
      gap: 1rem;
      flex-wrap: wrap;
    }

    .stats-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 1.5rem;
    }

    .stat-card {
      background: white;
      border-radius: 0.5rem;
      box-shadow: var(--shadow);
      padding: 1.5rem;
      text-align: center;
    }

    .stat-card h3 {
      margin: 0 0 1rem 0;
      color: var(--gray-600);
      font-size: 0.875rem;
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }

    .stat-value {
      font-size: 2rem;
      font-weight: 700;
      color: var(--primary-color);
    }

    .stats-details {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 2rem;
    }

    .stats-details h3 {
      margin-bottom: 1rem;
      color: var(--gray-900);
    }

    .stats-details ul {
      list-style: none;
      padding: 0;
    }

    .stats-details li {
      padding: 0.5rem 0;
      border-bottom: 1px solid var(--gray-200);
    }
  `]
})
export class AdminDashboardComponent implements OnInit {
  private reservationService = inject(ReservationService);
  private statisticsService = inject(StatisticsService);

  statistics: Statistics = {
    totalUsers: 0,
    totalReservations: 0,
    totalRevenue: 0
  };
  dashboardStats: DashboardStats | null = null;

  ngOnInit(): void {
    this.loadStatistics();
    this.loadDashboardStats();
  }

  loadStatistics(): void {
    this.statisticsService.getStatistics().subscribe({
      next: (stats) => {
        this.statistics = stats;
      }
    });
  }

  loadDashboardStats(): void {
    this.reservationService.getDashboardStats().subscribe({
      next: (stats) => {
        this.dashboardStats = stats;
      }
    });
  }

  getStatusKeys(obj: { [key: string]: number }): string[] {
    return Object.keys(obj);
  }

  getMonthKeys(obj: { [key: string]: number }): string[] {
    return Object.keys(obj);
  }
}
