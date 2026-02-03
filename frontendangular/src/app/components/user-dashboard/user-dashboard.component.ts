import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReservationService } from '../../services/reservation.service';
import { TerrainService } from '../../services/terrain.service';
import { Reservation, StatutReservation } from '../../models/reservation.model';
import { Terrain } from '../../models/terrain.model';

@Component({
  selector: 'app-user-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="dashboard-container">
      <h1>Mon Tableau de Bord</h1>

      <div class="dashboard-actions mb-3">
        <a routerLink="/reservations/new" class="btn btn-primary">Nouvelle Réservation</a>
        <a routerLink="/profile" class="btn btn-secondary">Mon Profil</a>
      </div>

      <div class="card">
        <h2>Mes Réservations</h2>
        <div *ngIf="loading" class="loading">
          <div class="spinner"></div>
          <p>Chargement...</p>
        </div>

        <div *ngIf="!loading && reservations.length === 0" class="text-center p-3">
          <p>Aucune réservation pour le moment.</p>
          <a routerLink="/reservations/new" class="btn btn-primary mt-2">Faire une réservation</a>
        </div>

        <div *ngIf="!loading && reservations.length > 0" class="reservations-list">
          <div *ngFor="let reservation of reservations" class="reservation-item">
            <div class="reservation-header">
              <h3>Réservation #{{ reservation.id }}</h3>
              <span [class]="'badge badge-' + getStatusClass(reservation.statut)">
                {{ getStatusLabel(reservation.statut) }}
              </span>
            </div>
            <div class="reservation-details">
              <p><strong>Date de réservation:</strong> {{ formatDate(reservation.dateReservation) }}</p>
              <p *ngIf="reservation.prixFinal"><strong>Prix:</strong> {{ reservation.prixFinal }} €</p>
              <div *ngIf="reservation.creneaux && reservation.creneaux.length > 0">
                <strong>Créneaux:</strong>
                <ul>
                  <li *ngFor="let creneau of reservation.creneaux">
                    {{ creneau.terrain?.nom }} - {{ formatDate(creneau.date) }} 
                    de {{ creneau.heureDebut }} à {{ creneau.heureFin }}
                  </li>
                </ul>
              </div>
              <div *ngIf="reservation.promotion">
                <span class="badge badge-success">Promotion: {{ reservation.promotion.code }} (-{{ reservation.promotion.pourcentageReduction * 100 }}%)</span>
              </div>
            </div>
            <div class="reservation-actions">
              <button 
                *ngIf="reservation.statut === 'EN_ATTENTE' || reservation.statut === 'CONFIRMEE'"
                (click)="cancelReservation(reservation.id!)" 
                class="btn btn-danger btn-sm"
                [disabled]="cancelling === reservation.id">
                Annuler
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .dashboard-container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 2rem;
    }

    .dashboard-actions {
      display: flex;
      gap: 1rem;
      flex-wrap: wrap;
    }

    .reservations-list {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }

    .reservation-item {
      border: 1px solid var(--gray-200);
      border-radius: 0.5rem;
      padding: 1.5rem;
      background: var(--gray-50);
    }

    .reservation-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 1rem;
    }

    .reservation-header h3 {
      margin: 0;
      color: var(--gray-900);
    }

    .reservation-details {
      margin-bottom: 1rem;
    }

    .reservation-details p {
      margin: 0.5rem 0;
    }

    .reservation-details ul {
      margin: 0.5rem 0;
      padding-left: 1.5rem;
    }

    .reservation-actions {
      display: flex;
      gap: 0.5rem;
    }

    .btn-sm {
      padding: 0.375rem 0.75rem;
      font-size: 0.875rem;
    }
  `]
})
export class UserDashboardComponent implements OnInit {
  private reservationService = inject(ReservationService);

  reservations: Reservation[] = [];
  loading = false;
  cancelling: number | null = null;

  ngOnInit(): void {
    this.loadReservations();
  }

  loadReservations(): void {
    this.loading = true;
    this.reservationService.getMyReservations().subscribe({
      next: (reservations) => {
        this.reservations = reservations;
        this.loading = false;
      },
      error: () => {
        this.loading = false;
      }
    });
  }

  cancelReservation(id: number): void {
    if (confirm('Êtes-vous sûr de vouloir annuler cette réservation ?')) {
      this.cancelling = id;
      this.reservationService.cancelReservation(id).subscribe({
        next: () => {
          this.loadReservations();
          this.cancelling = null;
        },
        error: () => {
          this.cancelling = null;
          alert('Erreur lors de l\'annulation');
        }
      });
    }
  }

  getStatusLabel(status: StatutReservation): string {
    const labels: { [key: string]: string } = {
      'EN_ATTENTE': 'En attente',
      'CONFIRMEE': 'Confirmée',
      'ANNULEE': 'Annulée'
    };
    return labels[status] || status;
  }

  getStatusClass(status: StatutReservation): string {
    const classes: { [key: string]: string } = {
      'EN_ATTENTE': 'warning',
      'CONFIRMEE': 'success',
      'ANNULEE': 'danger'
    };
    return classes[status] || 'info';
  }

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  }
}
