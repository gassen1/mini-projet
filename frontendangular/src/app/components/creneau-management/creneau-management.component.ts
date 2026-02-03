import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CreneauService } from '../../services/creneau.service';
import { TerrainService } from '../../services/terrain.service';
import { Creneau } from '../../models/creneau.model';
import { Terrain } from '../../models/terrain.model';

@Component({
  selector: 'app-creneau-management',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div class="management-container">
      <h1>Gestion des Créneaux</h1>

      <div class="card mb-3">
        <h2>Nouveau créneau</h2>
        <form [formGroup]="creneauForm" (ngSubmit)="onSubmit()">
          <div class="form-group">
            <label class="form-label" for="terrain">Terrain</label>
            <select id="terrain" class="form-control" formControlName="terrainId" (change)="onTerrainChange()">
              <option value="">Sélectionner un terrain</option>
              <option *ngFor="let terrain of terrains" [value]="terrain.id">{{ terrain.nom }}</option>
            </select>
          </div>

          <div class="form-group">
            <label class="form-label" for="date">Date</label>
            <input id="date" type="date" class="form-control" formControlName="date" />
          </div>

          <div class="form-group">
            <label class="form-label" for="heureDebut">Heure de début</label>
            <input id="heureDebut" type="time" class="form-control" formControlName="heureDebut" />
          </div>

          <div class="form-group">
            <label class="form-label" for="heureFin">Heure de fin</label>
            <input id="heureFin" type="time" class="form-control" formControlName="heureFin" />
          </div>

          <div class="form-actions">
            <button type="submit" class="btn btn-primary" [disabled]="creneauForm.invalid || saving">
              {{ saving ? 'Création...' : 'Créer' }}
            </button>
          </div>
        </form>
      </div>

      <div class="card">
        <h2>Liste des créneaux</h2>
        <div *ngIf="loading" class="loading">
          <div class="spinner"></div>
        </div>

        <table *ngIf="!loading" class="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Terrain</th>
              <th>Date</th>
              <th>Heure début</th>
              <th>Heure fin</th>
              <th>Statut</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr *ngFor="let creneau of creneaux">
              <td>{{ creneau.id }}</td>
              <td>{{ creneau.terrain?.nom || '-' }}</td>
              <td>{{ formatDate(creneau.date) }}</td>
              <td>{{ creneau.heureDebut }}</td>
              <td>{{ creneau.heureFin }}</td>
              <td>
                <span [class]="'badge badge-' + (creneau.estLibre ? 'success' : 'danger')">
                  {{ creneau.estLibre ? 'Libre' : 'Occupé' }}
                </span>
              </td>
              <td>
                <button (click)="deleteCreneau(creneau.id!)" class="btn btn-danger btn-sm">Supprimer</button>
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
export class CreneauManagementComponent implements OnInit {
  private fb = inject(FormBuilder);
  private creneauService = inject(CreneauService);
  private terrainService = inject(TerrainService);

  creneaux: Creneau[] = [];
  terrains: Terrain[] = [];
  loading = false;
  saving = false;
  creneauForm: FormGroup;

  constructor() {
    this.creneauForm = this.fb.group({
      terrainId: ['', [Validators.required]],
      date: ['', [Validators.required]],
      heureDebut: ['', [Validators.required]],
      heureFin: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
    this.loadTerrains();
    this.loadCreneaux();
  }

  loadTerrains(): void {
    this.terrainService.getAllTerrains().subscribe({
      next: (terrains) => {
        this.terrains = terrains;
      }
    });
  }

  loadCreneaux(): void {
    this.loading = true;
    this.creneauService.getAllCreneaux().subscribe({
      next: (creneaux) => {
        this.creneaux = creneaux;
        this.loading = false;
      },
      error: () => {
        this.loading = false;
      }
    });
  }

  onTerrainChange(): void {
    // Optionnel: charger les créneaux du terrain sélectionné
  }

  onSubmit(): void {
    if (this.creneauForm.valid) {
      this.saving = true;
      const formValue = this.creneauForm.value;
      const selectedTerrain = this.terrains.find(t => t.id === parseInt(formValue.terrainId));

      const creneauData: Creneau = {
        date: formValue.date,
        heureDebut: formValue.heureDebut,
        heureFin: formValue.heureFin,
        estLibre: true,
        terrain: selectedTerrain
      };

      this.creneauService.createCreneau(creneauData).subscribe({
        next: () => {
          this.saving = false;
          this.creneauForm.reset();
          this.loadCreneaux();
        },
        error: () => {
          this.saving = false;
          alert('Erreur lors de la création');
        }
      });
    }
  }

  deleteCreneau(id: number): void {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce créneau ?')) {
      this.creneauService.deleteCreneau(id).subscribe({
        next: () => {
          this.loadCreneaux();
        },
        error: () => {
          alert('Erreur lors de la suppression');
        }
      });
    }
  }

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR');
  }
}
