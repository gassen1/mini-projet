import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="container mt-5 animate-fade-in">
      <div class="row justify-content-center">
        <div class="col-md-8">
          <div class="card p-4 shadow-lg border-0 rounded-4">
            <h2 class="fw-bold mb-4 d-flex align-items-center">
              <i class="fas fa-user-circle text-primary me-2"></i> User Profile
            </h2>
            
            <form (ngSubmit)="updateProfile()">
              <div class="row mb-3">
                <div class="col-md-6">
                  <label class="form-label fw-semibold">First Name</label>
                  <input type="text" class="form-control" [(ngModel)]="user.prenom" name="prenom" required>
                </div>
                <div class="col-md-6">
                  <label class="form-label fw-semibold">Last Name</label>
                  <input type="text" class="form-control" [(ngModel)]="user.nom" name="nom" required>
                </div>
              </div>
              
              <div class="mb-3">
                <label class="form-label fw-semibold">Email address (Cannot be changed)</label>
                <input type="email" class="form-control bg-light" [value]="user.email" disabled>
              </div>
              
              <div class="mb-3">
                <label class="form-label fw-semibold">Phone Number</label>
                <input type="tel" class="form-control" [(ngModel)]="user.telephone" name="telephone">
              </div>
              
              <hr class="my-4">
              
              <div class="mb-3">
                <label class="form-label fw-semibold text-danger">New Password (Leave blank to keep current)</label>
                <input type="password" class="form-control" [(ngModel)]="newPassword" name="password" placeholder="••••••••">
              </div>
              
              <div class="d-grid mt-4">
                <button type="submit" class="btn btn-primary py-3 fw-bold" [disabled]="loading">
                  <span *ngIf="loading" class="spinner-border spinner-border-sm me-2"></span>
                  UPDATE PROFILE
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  `
})
export class ProfileComponent implements OnInit {
  user: any = {};
  newPassword = '';
  loading = false;
  private apiUrl = `${environment.apiUrl}/users/profile`;

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.loadProfile();
  }

  loadProfile() {
    this.http.get(this.apiUrl).subscribe({
      next: (data) => this.user = data,
      error: (err) => console.error('Error loading profile', err)
    });
  }

  updateProfile() {
    this.loading = true;
    const updateData = { ...this.user };
    if (this.newPassword) {
      updateData.password = this.newPassword;
    }

    this.http.put(this.apiUrl, updateData).subscribe({
      next: () => {
        this.loading = false;
        this.newPassword = '';
        Swal.fire({
          icon: 'success',
          title: 'Profile Updated',
          text: 'Your information has been successfully updated!',
          timer: 2000,
          showConfirmButton: false
        });
      },
      error: (err) => {
        this.loading = false;
        Swal.fire('Error', 'Failed to update profile. Please try again.', 'error');
      }
    });
  }
}
