import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReservationService } from '../../services/reservation.service';
import { Reservation, StatutReservation } from '../../models/reservation.model';

@Component({
  selector: 'app-admin-reservations',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="reservations-container">
      <h1>Toutes les Réservations</h1>

      <div class="card">
        <div *ngIf="loading" class="loading">
          <div class="spinner"></div>
          <p>Chargement...</p>
        </div>

        <table *ngIf="!loading" class="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Utilisateur</th>
              <th>Date réservation</th>
              <th>Créneaux</th>
              <th>Prix</th>
              <th>Statut</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr *ngFor="let reservation of reservations">
              <td>{{ reservation.id }}</td>
              <td>{{ reservation.adherent?.prenom }} {{ reservation.adherent?.nom }}</td>
              <td>{{ formatDate(reservation.dateReservation) }}</td>
              <td>
                <ul style="list-style: none; padding: 0; margin: 0;">
                  <li *ngFor="let creneau of reservation.creneaux">
                    {{ creneau.terrain?.nom }} - {{ formatDate(creneau.date) }} {{ creneau.heureDebut }}-{{ creneau.heureFin }}
                  </li>
                </ul>
              </td>
              <td>{{ reservation.prixFinal || '-' }} €</td>
              <td>
                <span [class]="'badge badge-' + getStatusClass(reservation.statut)">
                  {{ getStatusLabel(reservation.statut) }}
                </span>
              </td>
              <td>
                <select 
                  [value]="reservation.statut" 
                  (change)="updateStatus(reservation.id!, $event)"
                  class="form-control"
                  style="display: inline-block; width: auto;">
                  <option value="EN_ATTENTE">En attente</option>
                  <option value="CONFIRMEE">Confirmée</option>
                  <option value="ANNULEE">Annulée</option>
                </select>
              </td>
            </tr>
          </tbody>
        </table>

        <div *ngIf="!loading && reservations.length === 0" class="text-center p-3">
          <p>Aucune réservation.</p>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .reservations-container {
      max-width: 1400px;
      margin: 0 auto;
      padding: 2rem;
    }

    .table {
      font-size: 0.875rem;
    }

    .table td {
      vertical-align: top;
    }
  `]
})
export class AdminReservationsComponent implements OnInit {
  private reservationService = inject(ReservationService);

  reservations: Reservation[] = [];
  loading = false;

  ngOnInit(): void {
    this.loadReservations();
  }

  loadReservations(): void {
    this.loading = true;
    this.reservationService.getAllReservations().subscribe({
      next: (reservations) => {
        this.reservations = reservations;
        this.loading = false;
      },
      error: () => {
        this.loading = false;
      }
    });
  }

  updateStatus(id: number, event: Event): void {
    const select = event.target as HTMLSelectElement;
    const newStatus = select.value as StatutReservation;

    this.reservationService.updateReservationStatus(id, newStatus).subscribe({
      next: () => {
        this.loadReservations();
      },
      error: () => {
        alert('Erreur lors de la mise à jour');
        this.loadReservations();
      }
    });
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
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  }
}
