import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  template: `
    <div class="register-container">
      <div class="register-card">
        <h2>Inscription</h2>
        <form [formGroup]="registerForm" (ngSubmit)="onSubmit()">
          <div class="form-group">
            <label class="form-label" for="nom">Nom</label>
            <input
              id="nom"
              type="text"
              class="form-control"
              formControlName="nom"
              [class.error]="registerForm.get('nom')?.invalid && registerForm.get('nom')?.touched"
              placeholder="Votre nom"
            />
            <div *ngIf="registerForm.get('nom')?.invalid && registerForm.get('nom')?.touched" class="alert alert-error">
              Nom requis
            </div>
          </div>

          <div class="form-group">
            <label class="form-label" for="prenom">Prénom</label>
            <input
              id="prenom"
              type="text"
              class="form-control"
              formControlName="prenom"
              [class.error]="registerForm.get('prenom')?.invalid && registerForm.get('prenom')?.touched"
              placeholder="Votre prénom"
            />
            <div *ngIf="registerForm.get('prenom')?.invalid && registerForm.get('prenom')?.touched" class="alert alert-error">
              Prénom requis
            </div>
          </div>

          <div class="form-group">
            <label class="form-label" for="email">Email</label>
            <input
              id="email"
              type="email"
              class="form-control"
              formControlName="email"
              [class.error]="registerForm.get('email')?.invalid && registerForm.get('email')?.touched"
              placeholder="votre@email.com"
            />
            <div *ngIf="registerForm.get('email')?.invalid && registerForm.get('email')?.touched" class="alert alert-error">
              Email valide requis
            </div>
          </div>

          <div class="form-group">
            <label class="form-label" for="telephone">Téléphone</label>
            <input
              id="telephone"
              type="tel"
              class="form-control"
              formControlName="telephone"
              placeholder="06 12 34 56 78"
            />
          </div>

          <div class="form-group">
            <label class="form-label" for="password">Mot de passe</label>
            <input
              id="password"
              type="password"
              class="form-control"
              formControlName="password"
              [class.error]="registerForm.get('password')?.invalid && registerForm.get('password')?.touched"
              placeholder="••••••••"
            />
            <div *ngIf="registerForm.get('password')?.invalid && registerForm.get('password')?.touched" class="alert alert-error">
              Mot de passe requis (minimum 6 caractères)
            </div>
          </div>

          <div *ngIf="errorMessage" class="alert alert-error">
            {{ errorMessage }}
          </div>

          <div *ngIf="successMessage" class="alert alert-success">
            {{ successMessage }}
          </div>

          <button type="submit" class="btn btn-primary" [disabled]="registerForm.invalid || loading" style="width: 100%;">
            <span *ngIf="loading">Inscription...</span>
            <span *ngIf="!loading">S'inscrire</span>
          </button>
        </form>

        <div class="mt-2 text-center">
          <p>Déjà un compte ? <a routerLink="/login">Se connecter</a></p>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .register-container {
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: calc(100vh - 200px);
      padding: 2rem;
    }

    .register-card {
      background: white;
      border-radius: 0.5rem;
      box-shadow: var(--shadow-lg);
      padding: 2rem;
      width: 100%;
      max-width: 500px;
    }

    .register-card h2 {
      margin-bottom: 1.5rem;
      text-align: center;
      color: var(--gray-900);
    }

    a {
      color: var(--primary-color);
      text-decoration: none;
    }

    a:hover {
      text-decoration: underline;
    }
  `]
})
export class RegisterComponent {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);

  registerForm: FormGroup;
  loading = false;
  errorMessage = '';
  successMessage = '';

  constructor() {
    this.registerForm = this.fb.group({
      nom: ['', [Validators.required]],
      prenom: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      telephone: [''],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit(): void {
    if (this.registerForm.valid) {
      this.loading = true;
      this.errorMessage = '';
      this.successMessage = '';

      this.authService.register(this.registerForm.value).subscribe({
        next: () => {
          this.loading = false;
          this.successMessage = 'Inscription réussie ! Redirection...';
          setTimeout(() => {
            this.router.navigate(['/dashboard']);
          }, 1500);
        },
        error: (error) => {
          this.loading = false;
          this.errorMessage = error.error?.message || 'Erreur lors de l\'inscription. Veuillez réessayer.';
        }
      });
    }
  }
}
