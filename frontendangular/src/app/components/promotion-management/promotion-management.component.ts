import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { PromotionService } from '../../services/promotion.service';
import { Promotion } from '../../models/promotion.model';

@Component({
  selector: 'app-promotion-management',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div class="management-container">
      <h1>Gestion des Promotions</h1>

      <div class="card mb-3">
        <h2>Nouvelle promotion</h2>
        <form [formGroup]="promotionForm" (ngSubmit)="onSubmit()">
          <div class="form-group">
            <label class="form-label" for="code">Code</label>
            <input id="code" type="text" class="form-control" formControlName="code" placeholder="EXEMPLE20" />
          </div>

          <div class="form-group">
            <label class="form-label" for="pourcentageReduction">Pourcentage de réduction (0-1)</label>
            <input id="pourcentageReduction" type="number" step="0.01" min="0" max="1" class="form-control" 
                   formControlName="pourcentageReduction" placeholder="0.20 pour 20%" />
          </div>

          <div class="form-group">
            <label class="form-label" for="dateDebut">Date de début</label>
            <input id="dateDebut" type="datetime-local" class="form-control" formControlName="dateDebut" />
          </div>

          <div class="form-group">
            <label class="form-label" for="dateFin">Date de fin</label>
            <input id="dateFin" type="datetime-local" class="form-control" formControlName="dateFin" />
          </div>

          <div class="form-actions">
            <button type="submit" class="btn btn-primary" [disabled]="promotionForm.invalid || saving">
              {{ saving ? 'Création...' : 'Créer' }}
            </button>
          </div>
        </form>
      </div>

      <div class="card">
        <h2>Liste des promotions</h2>
        <div *ngIf="loading" class="loading">
          <div class="spinner"></div>
        </div>

        <table *ngIf="!loading" class="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Code</th>
              <th>Réduction</th>
              <th>Date début</th>
              <th>Date fin</th>
              <th>Statut</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr *ngFor="let promotion of promotions">
              <td>{{ promotion.id }}</td>
              <td><strong>{{ promotion.code }}</strong></td>
              <td>{{ promotion.pourcentageReduction * 100 }}%</td>
              <td>{{ formatDateTime(promotion.dateDebut) }}</td>
              <td>{{ formatDateTime(promotion.dateFin) }}</td>
              <td>
                <span [class]="'badge badge-' + (promotion.actif ? 'success' : 'danger')">
                  {{ promotion.actif ? 'Actif' : 'Inactif' }}
                </span>
              </td>
              <td>
                <button (click)="deletePromotion(promotion.id!)" class="btn btn-danger btn-sm">Supprimer</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  `,
  styles: [`
    .management-container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 2rem;
    }

    .form-actions {
      display: flex;
      gap: 1rem;
    }

    .btn-sm {
      padding: 0.375rem 0.75rem;
      font-size: 0.875rem;
    }
  `]
})
export class PromotionManagementComponent implements OnInit {
  private fb = inject(FormBuilder);
  private promotionService = inject(PromotionService);

  promotions: Promotion[] = [];
  loading = false;
  saving = false;
  promotionForm: FormGroup;

  constructor() {
    this.promotionForm = this.fb.group({
      code: ['', [Validators.required]],
      pourcentageReduction: [0, [Validators.required, Validators.min(0), Validators.max(1)]],
      dateDebut: ['', [Validators.required]],
      dateFin: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
    this.loadPromotions();
  }

  loadPromotions(): void {
    this.loading = true;
    this.promotionService.getAllPromotions().subscribe({
      next: (promotions) => {
        this.promotions = promotions;
        this.loading = false;
      },
      error: () => {
        this.loading = false;
      }
    });
  }

  onSubmit(): void {
    if (this.promotionForm.valid) {
      this.saving = true;
      const formValue = this.promotionForm.value;

      // Convertir les dates locales en ISO string
      const promotionData: Promotion = {
        code: formValue.code.toUpperCase(),
        pourcentageReduction: formValue.pourcentageReduction,
        dateDebut: new Date(formValue.dateDebut).toISOString(),
        dateFin: new Date(formValue.dateFin).toISOString(),
        actif: true
      };

      this.promotionService.createPromotion(promotionData).subscribe({
        next: () => {
          this.saving = false;
          this.promotionForm.reset();
          this.loadPromotions();
        },
        error: () => {
          this.saving = false;
          alert('Erreur lors de la création');
        }
      });
    }
  }

  deletePromotion(id: number): void {
    if (confirm('Êtes-vous sûr de vouloir supprimer cette promotion ?')) {
      this.promotionService.deletePromotion(id).subscribe({
        next: () => {
          this.loadPromotions();
        },
        error: () => {
          alert('Erreur lors de la suppression');
        }
      });
    }
  }

  formatDateTime(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleString('fr-FR');
  }
}
