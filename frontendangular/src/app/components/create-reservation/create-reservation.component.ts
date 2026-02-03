import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { TerrainService } from '../../services/terrain.service';
import { CreneauService } from '../../services/creneau.service';
import { PromotionService } from '../../services/promotion.service';
import { ReservationService } from '../../services/reservation.service';
import { Terrain } from '../../models/terrain.model';
import { Creneau } from '../../models/creneau.model';
import { Promotion } from '../../models/promotion.model';

@Component({
  selector: 'app-create-reservation',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="reservation-container">
      <h1>Nouvelle Réservation</h1>

      <div *ngIf="loading" class="loading">
        <div class="spinner"></div>
        <p>Chargement...</p>
      </div>

      <div *ngIf="!loading">
        <!-- Sélection du terrain -->
        <div class="card mb-3">
          <h2>1. Choisir un terrain</h2>
          <div class="grid grid-3">
            <div 
              *ngFor="let terrain of terrains" 
              class="terrain-card"
              [class.selected]="selectedTerrain?.id === terrain.id"
              (click)="selectTerrain(terrain)">
              <div *ngIf="terrain.imageUrl" class="terrain-image">
                <img [src]="terrain.imageUrl" [alt]="terrain.nom" />
              </div>
              <h3>{{ terrain.nom }}</h3>
              <p *ngIf="terrain.description">{{ terrain.description }}</p>
              <p><strong>Prix:</strong> {{ terrain.prix }} €</p>
              <p *ngIf="terrain.localisation"><strong>Localisation:</strong> {{ terrain.localisation }}</p>
              <span *ngIf="terrain.etat" [class]="'badge badge-' + (terrain.etat === 'DISPONIBLE' ? 'success' : 'warning')">
                {{ terrain.etat }}
              </span>
            </div>
          </div>
        </div>

        <!-- Sélection des créneaux -->
        <div *ngIf="selectedTerrain" class="card mb-3">
          <h2>2. Choisir les créneaux</h2>
          <div *ngIf="loadingCreneaux" class="loading">
            <div class="spinner"></div>
          </div>
          <div *ngIf="!loadingCreneaux && creneaux.length === 0" class="alert alert-info">
            Aucun créneau disponible pour ce terrain.
          </div>
          <div *ngIf="!loadingCreneaux && creneaux.length > 0" class="creneaux-grid">
            <div 
              *ngFor="let creneau of creneaux"
              class="creneau-item"
              [class.selected]="isCreneauSelected(creneau.id!)"
              [class.disabled]="!creneau.estLibre"
              (click)="toggleCreneau(creneau)">
              <div class="creneau-date">{{ formatDate(creneau.date) }}</div>
              <div class="creneau-time">{{ creneau.heureDebut }} - {{ creneau.heureFin }}</div>
              <div *ngIf="!creneau.estLibre" class="badge badge-danger">Indisponible</div>
            </div>
          </div>
        </div>

        <!-- Code promotionnel -->
        <div *ngIf="selectedCreneaux.length > 0" class="card mb-3">
          <h2>3. Code promotionnel (optionnel)</h2>
          <div class="form-group">
            <input
              type="text"
              class="form-control"
              [(ngModel)]="promoCode"
              placeholder="Entrez un code promotionnel"
              (blur)="validatePromoCode()"
            />
            <div *ngIf="validPromotion" class="alert alert-success mt-2">
              Code valide ! Réduction de {{ validPromotion.pourcentageReduction * 100 }}%
            </div>
            <div *ngIf="promoError" class="alert alert-error mt-2">
              {{ promoError }}
            </div>
          </div>
        </div>

        <!-- Récapitulatif -->
        <div *ngIf="selectedCreneaux.length > 0" class="card mb-3">
          <h2>Récapitulatif</h2>
          <div class="summary">
            <p><strong>Terrain:</strong> {{ selectedTerrain?.nom }}</p>
            <p><strong>Nombre de créneaux:</strong> {{ selectedCreneaux.length }}</p>
            <p><strong>Prix unitaire:</strong> {{ selectedTerrain?.prix }} €</p>
            <p><strong>Total:</strong> {{ calculateTotal() }} €</p>
            <div *ngIf="validPromotion" class="promotion-info">
              <p><strong>Réduction:</strong> -{{ validPromotion.pourcentageReduction * 100 }}%</p>
              <p><strong>Prix final:</strong> {{ calculateFinalPrice() }} €</p>
            </div>
          </div>
        </div>

        <!-- Actions -->
        <div *ngIf="selectedCreneaux.length > 0" class="card">
          <div *ngIf="errorMessage" class="alert alert-error">
            {{ errorMessage }}
          </div>
          <div *ngIf="successMessage" class="alert alert-success">
            {{ successMessage }}
          </div>
          <button 
            (click)="createReservation()" 
            class="btn btn-primary"
            [disabled]="creating">
            <span *ngIf="creating">Création...</span>
            <span *ngIf="!creating">Confirmer la réservation</span>
          </button>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .reservation-container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 2rem;
    }

    .terrain-card {
      border: 2px solid var(--gray-200);
      border-radius: 0.5rem;
      padding: 1rem;
      cursor: pointer;
      transition: all 0.2s;
      background: white;
    }

    .terrain-card:hover {
      border-color: var(--primary-color);
      box-shadow: var(--shadow-md);
    }

    .terrain-card.selected {
      border-color: var(--primary-color);
      background: var(--gray-50);
    }

    .terrain-image {
      width: 100%;
      height: 150px;
      overflow: hidden;
      border-radius: 0.375rem;
      margin-bottom: 0.5rem;
    }

    .terrain-image img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    .terrain-card h3 {
      margin: 0.5rem 0;
      color: var(--gray-900);
    }

    .creneaux-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
      gap: 1rem;
    }

    .creneau-item {
      border: 2px solid var(--gray-200);
      border-radius: 0.5rem;
      padding: 1rem;
      cursor: pointer;
      transition: all 0.2s;
      text-align: center;
      background: white;
    }

    .creneau-item:hover:not(.disabled) {
      border-color: var(--primary-color);
    }

    .creneau-item.selected {
      border-color: var(--primary-color);
      background: var(--gray-50);
    }

    .creneau-item.disabled {
      opacity: 0.5;
      cursor: not-allowed;
      background: var(--gray-100);
    }

    .creneau-date {
      font-weight: 600;
      margin-bottom: 0.5rem;
    }

    .creneau-time {
      color: var(--gray-600);
    }

    .summary {
      background: var(--gray-50);
      padding: 1rem;
      border-radius: 0.375rem;
    }

    .summary p {
      margin: 0.5rem 0;
    }

    .promotion-info {
      margin-top: 1rem;
      padding-top: 1rem;
      border-top: 2px solid var(--success-color);
    }
  `]
})
export class CreateReservationComponent implements OnInit {
  private terrainService = inject(TerrainService);
  private creneauService = inject(CreneauService);
  private promotionService = inject(PromotionService);
  private reservationService = inject(ReservationService);
  private router = inject(Router);

  terrains: Terrain[] = [];
  creneaux: Creneau[] = [];
  selectedTerrain: Terrain | null = null;
  selectedCreneaux: Creneau[] = [];
  promoCode = '';
  validPromotion: Promotion | null = null;
  promoError = '';

  loading = false;
  loadingCreneaux = false;
  creating = false;
  errorMessage = '';
  successMessage = '';

  ngOnInit(): void {
    this.loadTerrains();
  }

  loadTerrains(): void {
    this.loading = true;
    this.terrainService.getAllTerrains().subscribe({
      next: (terrains) => {
        this.terrains = terrains;
        this.loading = false;
      },
      error: () => {
        this.loading = false;
        this.errorMessage = 'Erreur lors du chargement des terrains';
      }
    });
  }

  selectTerrain(terrain: Terrain): void {
    if (terrain.etat === 'MAINTENANCE') {
      alert('Ce terrain est en maintenance');
      return;
    }
    this.selectedTerrain = terrain;
    this.selectedCreneaux = [];
    this.loadCreneaux(terrain.id!);
  }

  loadCreneaux(terrainId: number): void {
    this.loadingCreneaux = true;
    this.creneaux = [];
    this.creneauService.getAvailableCreneauxByTerrain(terrainId).subscribe({
      next: (creneaux) => {
        this.creneaux = creneaux;
        this.loadingCreneaux = false;
      },
      error: () => {
        this.loadingCreneaux = false;
      }
    });
  }

  toggleCreneau(creneau: Creneau): void {
    if (!creneau.estLibre) return;

    const index = this.selectedCreneaux.findIndex(c => c.id === creneau.id);
    if (index > -1) {
      this.selectedCreneaux.splice(index, 1);
    } else {
      this.selectedCreneaux.push(creneau);
    }
  }

  isCreneauSelected(creneauId: number): boolean {
    return this.selectedCreneaux.some(c => c.id === creneauId);
  }

  validatePromoCode(): void {
    if (!this.promoCode.trim()) {
      this.validPromotion = null;
      this.promoError = '';
      return;
    }

    this.promotionService.validatePromotionCode(this.promoCode.trim()).subscribe({
      next: (promotion) => {
        this.validPromotion = promotion;
        this.promoError = '';
      },
      error: () => {
        this.validPromotion = null;
        this.promoError = 'Code promotionnel invalide ou expiré';
      }
    });
  }

  calculateTotal(): number {
    if (!this.selectedTerrain) return 0;
    return this.selectedTerrain.prix * this.selectedCreneaux.length;
  }

  calculateFinalPrice(): number {
    const total = this.calculateTotal();
    if (this.validPromotion) {
      return total * (1 - this.validPromotion.pourcentageReduction);
    }
    return total;
  }

  createReservation(): void {
    if (this.selectedCreneaux.length === 0) {
      this.errorMessage = 'Veuillez sélectionner au moins un créneau';
      return;
    }

    this.creating = true;
    this.errorMessage = '';
    this.successMessage = '';

    const request = {
      creneauIds: this.selectedCreneaux.map(c => c.id!),
      codePromo: this.promoCode.trim() || undefined
    };

    this.reservationService.createReservation(request).subscribe({
      next: () => {
        this.creating = false;
        this.successMessage = 'Réservation créée avec succès !';
        setTimeout(() => {
          this.router.navigate(['/dashboard']);
        }, 2000);
      },
      error: (error) => {
        this.creating = false;
        this.errorMessage = error.error?.message || 'Erreur lors de la création de la réservation';
      }
    });
  }

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }
}
