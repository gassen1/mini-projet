import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { Role } from '../../models/user.model';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  template: `
    <div class="container h-100 mt-5">
      <div class="row justify-content-center align-items-center h-100">
        <div class="col-md-5">
          <div class="card p-4 shadow-lg border-0 rounded-4">
            <div class="text-center mb-4">
              <h2 class="fw-bold text-primary">Welcome Back</h2>
              <p class="text-muted">Sign in to book your next padel session</p>
            </div>
            <form (ngSubmit)="onSubmit()">
              <div class="mb-3">
                <label class="form-label fw-semibold">Email address</label>
                <div class="input-group">
                  <span class="input-group-text bg-white border-end-0"><i class="fas fa-envelope text-muted"></i></span>
                  <input type="email" class="form-control border-start-0" [(ngModel)]="email" name="email" required placeholder="name@example.com">
                </div>
              </div>
              <div class="mb-4">
                <label class="form-label fw-semibold">Password</label>
                <div class="input-group">
                  <span class="input-group-text bg-white border-end-0"><i class="fas fa-lock text-muted"></i></span>
                  <input type="password" class="form-control border-start-0" [(ngModel)]="password" name="password" required placeholder="Enter your password">
                </div>
              </div>
              <div *ngIf="error" class="alert alert-danger py-2 mb-4">
                <i class="fas fa-exclamation-circle me-2"></i> {{ error }}
              </div>
              <button type="submit" class="btn btn-primary w-100 py-3 fw-bold shadow-sm" [disabled]="loading">
                <span *ngIf="loading" class="spinner-border spinner-border-sm me-2"></span>
                SIGN IN
              </button>
            </form>
            <div class="text-center mt-4">
              <p class="mb-0 text-muted">New player? <a routerLink="/register" class="text-primary fw-bold text-decoration-none">Register here</a></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .form-control:focus { box-shadow: none; border-color: #0d6efd; }
    .input-group-text { border-right: none; }
    .rounded-4 { border-radius: 1.5rem !important; }
  `]
})
export class LoginComponent {
  email = '';
  password = '';
  loading = false;
  error = '';

  constructor(private authService: AuthService, private router: Router) { }

  onSubmit() {
    this.loading = true;
    this.error = '';
    this.authService.login(this.email, this.password)
      .pipe(finalize(() => this.loading = false))
      .subscribe({
        next: (user) => {
          if (user.role === Role.ADMIN) {
            this.router.navigate(['/admin']);
          } else {
            this.router.navigate(['/dashboard']);
          }
        },
        error: (err) => {
          console.error('Login error:', err);
          this.error = typeof err === 'string' ? err : 'Invalid email or password';
        }
      });
  }
}
