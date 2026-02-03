import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div class="profile-container">
      <h1>Mon Profil</h1>

      <div class="card">
        <form [formGroup]="profileForm" (ngSubmit)="onSubmit()">
          <div class="form-group">
            <label class="form-label" for="nom">Nom</label>
            <input
              id="nom"
              type="text"
              class="form-control"
              formControlName="nom"
              [class.error]="profileForm.get('nom')?.invalid && profileForm.get('nom')?.touched"
            />
          </div>

          <div class="form-group">
            <label class="form-label" for="prenom">Prénom</label>
            <input
              id="prenom"
              type="text"
              class="form-control"
              formControlName="prenom"
              [class.error]="profileForm.get('prenom')?.invalid && profileForm.get('prenom')?.touched"
            />
          </div>

          <div class="form-group">
            <label class="form-label" for="email">Email</label>
            <input
              id="email"
              type="email"
              class="form-control"
              formControlName="email"
              [class.error]="profileForm.get('email')?.invalid && profileForm.get('email')?.touched"
              readonly
            />
            <small class="text-muted">L'email ne peut pas être modifié</small>
          </div>

          <div class="form-group">
            <label class="form-label" for="telephone">Téléphone</label>
            <input
              id="telephone"
              type="tel"
              class="form-control"
              formControlName="telephone"
            />
          </div>

          <div *ngIf="errorMessage" class="alert alert-error">
            {{ errorMessage }}
          </div>

          <div *ngIf="successMessage" class="alert alert-success">
            {{ successMessage }}
          </div>

          <div class="form-actions">
            <button type="submit" class="btn btn-primary" [disabled]="profileForm.invalid || loading">
              <span *ngIf="loading">Enregistrement...</span>
              <span *ngIf="!loading">Enregistrer les modifications</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  `,
  styles: [`
    .profile-container {
      max-width: 600px;
      margin: 0 auto;
      padding: 2rem;
    }

    .form-actions {
      margin-top: 1.5rem;
    }

    .text-muted {
      color: var(--gray-500);
      font-size: 0.875rem;
      margin-top: 0.25rem;
      display: block;
    }
  `]
})
export class ProfileComponent implements OnInit {
  private fb = inject(FormBuilder);
  private userService = inject(UserService);

  profileForm: FormGroup;
  loading = false;
  errorMessage = '';
  successMessage = '';

  ngOnInit(): void {
    this.profileForm = this.fb.group({
      nom: ['', [Validators.required]],
      prenom: ['', [Validators.required]],
      email: [{ value: '', disabled: true }, [Validators.required, Validators.email]],
      telephone: ['']
    });

    this.loadProfile();
  }

  loadProfile(): void {
    this.userService.getProfile().subscribe({
      next: (user) => {
        this.profileForm.patchValue({
          nom: user.nom,
          prenom: user.prenom,
          email: user.email,
          telephone: user.telephone || ''
        });
      },
      error: () => {
        this.errorMessage = 'Erreur lors du chargement du profil';
      }
    });
  }

  onSubmit(): void {
    if (this.profileForm.valid) {
      this.loading = true;
      this.errorMessage = '';
      this.successMessage = '';

      const formValue = this.profileForm.getRawValue();
      const userData: User = {
        ...formValue,
        email: this.profileForm.get('email')?.value,
        role: 'ADHERENT' as any
      };

      this.userService.updateProfile(userData).subscribe({
        next: () => {
          this.loading = false;
          this.successMessage = 'Profil mis à jour avec succès !';
        },
        error: () => {
          this.loading = false;
          this.errorMessage = 'Erreur lors de la mise à jour du profil';
        }
      });
    }
  }
}
