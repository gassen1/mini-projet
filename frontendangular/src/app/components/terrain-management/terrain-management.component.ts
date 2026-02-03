import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { TerrainService } from '../../services/terrain.service';
import { Terrain } from '../../models/terrain.model';

@Component({
  selector: 'app-terrain-management',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div class="management-container">
      <h1>Gestion des Terrains</h1>

      <div class="card mb-3">
        <h2>{{ editingTerrain ? 'Modifier le terrain' : 'Nouveau terrain' }}</h2>
        <form [formGroup]="terrainForm" (ngSubmit)="onSubmit()">
          <div class="form-group">
            <label class="form-label" for="nom">Nom</label>
            <input id="nom" type="text" class="form-control" formControlName="nom" />
          </div>

          <div class="form-group">
            <label class="form-label" for="description">Description</label>
            <textarea id="description" class="form-control" formControlName="description" rows="3"></textarea>
          </div>

          <div class="form-group">
            <label class="form-label" for="localisation">Localisation</label>
            <input id="localisation" type="text" class="form-control" formControlName="localisation" />
          </div>

          <div class="form-group">
            <label class="form-label" for="prix">Prix (€)</label>
            <input id="prix" type="number" step="0.01" class="form-control" formControlName="prix" />
          </div>

          <div class="form-group">
            <label class="form-label" for="etat">État</label>
            <select id="etat" class="form-control" formControlName="etat">
              <option value="DISPONIBLE">Disponible</option>
              <option value="MAINTENANCE">Maintenance</option>
            </select>
          </div>

          <div class="form-group">
            <label class="form-label" for="imageUrl">URL de l'image</label>
            <input id="imageUrl" type="url" class="form-control" formControlName="imageUrl" />
          </div>

          <div class="form-actions">
            <button type="submit" class="btn btn-primary" [disabled]="terrainForm.invalid || saving">
              {{ saving ? 'Enregistrement...' : (editingTerrain ? 'Modifier' : 'Créer') }}
            </button>
            <button type="button" class="btn btn-secondary" (click)="cancelEdit()" *ngIf="editingTerrain">
              Annuler
            </button>
          </div>
        </form>
      </div>

      <div class="card">
        <h2>Liste des terrains</h2>
        <div *ngIf="loading" class="loading">
          <div class="spinner"></div>
        </div>

        <table *ngIf="!loading" class="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nom</th>
              <th>Localisation</th>
              <th>Prix</th>
              <th>État</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr *ngFor="let terrain of terrains">
              <td>{{ terrain.id }}</td>
              <td>{{ terrain.nom }}</td>
              <td>{{ terrain.localisation || '-' }}</td>
              <td>{{ terrain.prix }} €</td>
              <td>
                <span [class]="'badge badge-' + (terrain.etat === 'DISPONIBLE' ? 'success' : 'warning')">
                  {{ terrain.etat }}
                </span>
              </td>
              <td>
                <button (click)="editTerrain(terrain)" class="btn btn-secondary btn-sm">Modifier</button>
                <button (click)="deleteTerrain(terrain.id!)" class="btn btn-danger btn-sm">Supprimer</button>
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
      margin-right: 0.5rem;
    }
  `]
})
export class TerrainManagementComponent implements OnInit {
  private fb = inject(FormBuilder);
  private terrainService = inject(TerrainService);

  terrains: Terrain[] = [];
  loading = false;
  saving = false;
  editingTerrain: Terrain | null = null;
  terrainForm: FormGroup;

  constructor() {
    this.terrainForm = this.fb.group({
      nom: ['', [Validators.required]],
      description: [''],
      localisation: [''],
      prix: [0, [Validators.required, Validators.min(0)]],
      etat: ['DISPONIBLE', [Validators.required]],
      imageUrl: ['']
    });
  }

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
      }
    });
  }

  onSubmit(): void {
    if (this.terrainForm.valid) {
      this.saving = true;
      const terrainData = this.terrainForm.value;

      if (this.editingTerrain) {
        this.terrainService.updateTerrain(this.editingTerrain.id!, terrainData).subscribe({
          next: () => {
            this.saving = false;
            this.cancelEdit();
            this.loadTerrains();
          },
          error: () => {
            this.saving = false;
            alert('Erreur lors de la modification');
          }
        });
      } else {
        this.terrainService.createTerrain(terrainData).subscribe({
          next: () => {
            this.saving = false;
            this.terrainForm.reset();
            this.loadTerrains();
          },
          error: () => {
            this.saving = false;
            alert('Erreur lors de la création');
          }
        });
      }
    }
  }

  editTerrain(terrain: Terrain): void {
    this.editingTerrain = terrain;
    this.terrainForm.patchValue({
      nom: terrain.nom,
      description: terrain.description || '',
      localisation: terrain.localisation || '',
      prix: terrain.prix,
      etat: terrain.etat || 'DISPONIBLE',
      imageUrl: terrain.imageUrl || ''
    });
  }

  cancelEdit(): void {
    this.editingTerrain = null;
    this.terrainForm.reset();
  }

  deleteTerrain(id: number): void {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce terrain ?')) {
      this.terrainService.deleteTerrain(id).subscribe({
        next: () => {
          this.loadTerrains();
        },
        error: () => {
          alert('Erreur lors de la suppression');
        }
      });
    }
  }
}
