import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  template: `
    <div class="container h-100 mt-5">
      <div class="row justify-content-center align-items-center h-100">
        <div class="col-md-6">
          <div class="card p-4 shadow-lg border-0 rounded-4">
            <div class="text-center mb-4">
              <h2 class="fw-bold text-success">Join the Padel Community</h2>
              <p class="text-muted">Register now and get your credentials via email</p>
            </div>
            <form (ngSubmit)="onSubmit()" *ngIf="!success">
              <div class="row">
                <div class="col-md-6 mb-3">
                  <label class="form-label fw-semibold">First Name</label>
                  <input type="text" class="form-control" [(ngModel)]="prenom" name="prenom" required placeholder="John">
                </div>
                <div class="col-md-6 mb-3">
                  <label class="form-label fw-semibold">Last Name</label>
                  <input type="text" class="form-control" [(ngModel)]="nom" name="nom" required placeholder="Doe">
                </div>
              </div>
              <div class="mb-3">
                <label class="form-label fw-semibold">Email address</label>
                <div class="input-group">
                  <span class="input-group-text bg-white border-end-0"><i class="fas fa-envelope text-muted"></i></span>
                  <input type="email" class="form-control border-start-0" [(ngModel)]="email" name="email" required placeholder="john.doe@example.com">
                </div>
              </div>
                <div class="mb-3">
                  <label class="form-label fw-semibold">Password</label>
                  <div class="input-group">
                    <span class="input-group-text bg-white border-end-0"><i class="fas fa-lock text-muted"></i></span>
                    <input type="password" class="form-control border-start-0" [(ngModel)]="password" name="password" required placeholder="Create a password">
                  </div>
                </div>
                <div class="mb-4">
                  <label class="form-label fw-semibold">Phone Number</label>
                  <div class="input-group">
                    <span class="input-group-text bg-white border-end-0"><i class="fas fa-phone text-muted"></i></span>
                    <input type="tel" class="form-control border-start-0" [(ngModel)]="telephone" name="telephone" required placeholder="+216 55 123 456">
                  </div>
                </div>
              <div *ngIf="error" class="alert alert-danger py-2 mb-4">
                <i class="fas fa-exclamation-circle me-2"></i> {{ error }}
              </div>
              <button type="submit" class="btn btn-success w-100 py-3 fw-bold shadow-sm" [disabled]="loading">
                <span *ngIf="loading" class="spinner-border spinner-border-sm me-2"></span>
                REGISTER NOW
              </button>
            </form>
            
            <div *ngIf="success" class="text-center py-4">
              <div class="display-1 text-success mb-3"><i class="fas fa-check-circle"></i></div>
              <h3 class="fw-bold">Registration Successful!</h3>
              <p class="text-muted">You can now login using the password you just created.</p>
              <button routerLink="/login" class="btn btn-primary px-5 py-2 mt-3 fw-bold">GO TO LOGIN</button>
            </div>

            <div class="text-center mt-4" *ngIf="!success">
              <p class="mb-0 text-muted">Already have an account? <a routerLink="/login" class="text-success fw-bold text-decoration-none">Login here</a></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .form-control:focus { box-shadow: none; border-color: #198754; }
    .rounded-4 { border-radius: 1.5rem !important; }
  `]
})
export class RegisterComponent {
  nom = '';
  prenom = '';
  email = '';
  telephone = '';
  password = '';
  loading = false;
  success = false;
  error = '';

  constructor(private authService: AuthService) { }

  onSubmit() {
    if (!this.email || !this.password) {
      this.error = 'Please fill in all fields';
      return;
    }
    this.loading = true;
    this.error = '';
    this.authService.register(this.nom, this.prenom, this.email, this.telephone, this.password)
      .pipe(finalize(() => this.loading = false))
      .subscribe({
        next: () => {
          this.success = true;
        },
        error: (err) => {
          console.error('Registration error:', err);
          this.error = typeof err === 'string' ? err : 'Registration failed. Email might already be in use.';
        }
      });
  }
}
