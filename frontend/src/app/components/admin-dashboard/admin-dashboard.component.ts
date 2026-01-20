import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TerrainService } from '../../services/terrain.service';
import { ReservationService } from '../../services/reservation.service';
import { Reservation, StatutReservation } from '../../models/reservation.model';
import { Terrain } from '../../models/terrain.model';
import { FormsModule } from '@angular/forms';
import { Creneau } from '../../models/creneau.model';
import { CreneauService } from '../../services/creneau.service';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="container pb-5 mt-4 animate-fade-in">
      <div class="row mb-5">
        <div class="col-12">
          <div class="card bg-gradient-dark text-white p-5 rounded-4 shadow-lg border-0 overflow-hidden position-relative hero-card">
            <div class="position-absolute top-50 end-0 translate-middle-y me-n5 opacity-10">
              <i class="fas fa-cog fa-10x spin-slow"></i>
            </div>
            <div class="d-flex justify-content-between align-items-center position-relative z-1">
              <div>
                <h1 class="fw-black mb-1 display-5">Admin Portal</h1>
                <p class="text-light opacity-75 fs-5 fw-light">Seamless court management & reservation control</p>
              </div>
              <div class="d-flex glass-nav p-2 rounded-pill">
                <button class="btn btn-nav px-4 py-2 rounded-pill" (click)="view = 'terrains'" [class.active]="view === 'terrains'">
                  <i class="fas fa-th-large me-2"></i>Inventory
                </button>
                <button class="btn btn-nav px-4 py-2 rounded-pill" (click)="switchToSlotsView()" [class.active]="view === 'slots'">
                  <i class="fas fa-clock me-2"></i>Availability
                </button>
                <button class="btn btn-nav px-4 py-2 rounded-pill position-relative" (click)="view = 'reservations'" [class.active]="view === 'reservations'">
                  <i class="fas fa-calendar-check me-2"></i>Bookings
                  <span class="badge-dot" *ngIf="pendingCount > 0"></span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- COURTS & SLOTS MANAGEMENT -->
      <div *ngIf="view === 'terrains'" class="view-content">
        <div class="d-flex justify-content-between align-items-center mb-4">
          <h3 class="fw-bold m-0 text-dark">Court Inventory</h3>
          <button class="btn btn-primary-gradient fw-bold px-4 py-2 rounded-3 shadow-sm" (click)="showTerrainForm = !showTerrainForm">
            <i class="fas" [class.fa-plus]="!showTerrainForm" [class.fa-times]="showTerrainForm"></i> 
            {{ showTerrainForm ? ' Cancel' : ' Add New Court' }}
          </button>
        </div>

        <!-- Add/Edit Terrain Form -->
        <div *ngIf="showTerrainForm" class="card border-0 shadow-lg rounded-4 p-4 mb-5 animate-slide-down glass-form">
          <h5 class="fw-bold mb-4 text-primary">{{ editingTerrain ? 'Edit' : 'Register New' }} Padel Court</h5>
          <form (ngSubmit)="saveTerrain()">
            <div class="row g-4">
              <div class="col-md-4">
                <div class="form-floating mb-3">
                  <input type="text" class="form-control" id="tName" [(ngModel)]="terrainForm.nom" name="nom" required placeholder="Main Court 1">
                  <label for="tName">Court Name</label>
                </div>
              </div>
              <div class="col-md-4">
                <div class="form-floating mb-3">
                  <input type="text" class="form-control" id="tLoc" [(ngModel)]="terrainForm.localisation" name="localisation" required placeholder="Club North Wing">
                  <label for="tLoc">Location / Section</label>
                </div>
              </div>
              <div class="col-md-4">
                <div class="form-floating mb-3">
                  <input type="number" class="form-control" id="tPrice" [(ngModel)]="terrainForm.prix" name="prix" required>
                  <label for="tPrice">Price (DT/hour)</label>
                </div>
              </div>
              <div class="col-md-9">
                <div class="form-floating">
                  <textarea class="form-control" id="tDesc" [(ngModel)]="terrainForm.description" name="description" style="height: 100px" placeholder="Description"></textarea>
                  <label for="tDesc">Description & Amenities</label>
                </div>
              </div>
              <div class="col-md-3">
                <div class="form-floating mb-3">
                  <select class="form-select" id="tStatus" [(ngModel)]="terrainForm.etat" name="etat" required>
                    <option value="DISPONIBLE">DISPONIBLE</option>
                    <option value="MAINTENANCE">MAINTENANCE</option>
                    <option value="RESERVE">RESERVÉ</option>
                  </select>
                  <label for="tStatus">Current Status</label>
                </div>
              </div>
            </div>
            <div class="mt-4 pt-2 d-flex gap-3">
              <button type="submit" class="btn btn-success-gradient px-5 py-2 rounded-3 fw-bold">SAVE COURT</button>
              <button type="button" class="btn btn-outline-secondary px-4 py-2 rounded-3" (click)="cancelTerrainEdit()">DISCARD</button>
            </div>
          </form>
        </div>

        <div class="row g-4">
          <div class="col-md-6 col-lg-4" *ngFor="let t of terrains">
            <div class="card h-100 border-0 shadow-sm rounded-4 overflow-hidden court-card">
              <div class="card-header border-0 bg-transparent p-4 pb-0">
                <div class="d-flex justify-content-between align-items-center">
                  <div class="price-tag">{{ t.prix }} DT/h</div>
                  <div class="badge fw-bold" [ngClass]="{
                    'bg-soft-success text-success': t.etat === 'DISPONIBLE',
                    'bg-soft-warning text-warning': t.etat === 'MAINTENANCE',
                    'bg-soft-danger text-danger': t.etat === 'RESERVE'
                  }">{{ t.etat || 'DISPONIBLE' }}</div>
                </div>
              </div>
              <div class="card-body p-4 pt-3">
                <h4 class="fw-bold text-dark mb-1">{{ t.nom }}</h4>
                <p class="text-muted small mb-3"><i class="fas fa-map-marker-alt text-primary me-2"></i>{{ t.localisation }}</p>
                <p class="text-secondary small line-clamp-2 mb-4">{{ t.description || 'No description provided.' }}</p>
                
                <div class="d-grid gap-2 mb-4">
                  <button class="btn btn-outline-primary rounded-3 py-2 fw-semibold" (click)="openSlotForm(t)">
                    <i class="fas fa-plus-circle me-2"></i>Schedule Time Slot
                  </button>
                </div>

                <div class="d-flex justify-content-end gap-2 border-top pt-3">
                  <button class="btn btn-action text-primary" (click)="editTerrain(t)" title="Edit"><i class="fas fa-pen"></i></button>
                  <button class="btn btn-action text-danger" (click)="deleteTerrain(t.id!)" title="Delete"><i class="fas fa-trash-alt"></i></button>
                </div>
              </div>
            </div>
          </div>
          
          <!-- Empty State -->
          <div class="col-12 text-center py-5" *ngIf="terrains.length === 0">
             <div class="bg-light p-5 rounded-4 d-inline-block shadow-sm invitation-box">
                <i class="fas fa-table-tennis fa-3x text-muted mb-3"></i>
                <h5 class="fw-bold">No courts registered yet</h5>
                <p class="text-muted">Start by adding your first Padel court to the inventory.</p>
                <button class="btn btn-primary mt-2" (click)="showTerrainForm = true">ADD COURT NOW</button>
             </div>
          </div>
        </div>
      </div>

      <!-- SLOTS MANAGEMENT -->
      <div *ngIf="view === 'slots'" class="view-content">
        <div class="d-flex justify-content-between align-items-center mb-4">
          <h3 class="fw-bold m-0 text-dark">Time Slots Management</h3>
          <div class="d-flex gap-2">
            <select class="form-select border-0 shadow-sm rounded-3" [(ngModel)]="selectedTerrainId" (change)="loadSlots()">
              <option [value]="null">All Terrains</option>
              <option *ngFor="let t of terrains" [value]="t.id">{{ t.nom }}</option>
            </select>
          </div>
        </div>

        <div class="card border-0 shadow-lg rounded-4 overflow-hidden">
          <div class="table-responsive">
            <table class="table table-hover align-middle mb-0">
              <thead class="bg-light">
                <tr>
                  <th class="ps-4 py-3 border-0">Court</th>
                  <th class="py-3 border-0">Date</th>
                  <th class="py-3 border-0">Time Range</th>
                  <th class="py-3 border-0 text-center">Status</th>
                  <th class="pe-4 py-3 border-0 text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr *ngFor="let s of allSlots">
                  <td class="ps-4"><strong>{{ s.terrain?.nom }}</strong></td>
                  <td>{{ s.date | date:'mediumDate' }}</td>
                  <td><span class="badge bg-soft-primary text-primary px-3">{{ s.heureDebut }} - {{ s.heureFin }}</span></td>
                  <td class="text-center">
                    <span class="status-pill" [ngClass]="s.estLibre ? 'bg-success-soft text-success' : 'bg-danger-soft text-danger'">
                      {{ s.estLibre ? 'AVAILABLE' : 'RESERVED' }}
                    </span>
                  </td>
                  <td class="pe-4 text-center">
                    <button class="btn btn-action text-danger mx-auto" (click)="deleteSlot(s.id!)" [disabled]="!s.estLibre" title="Delete Slot">
                      <i class="fas fa-trash-alt"></i>
                    </button>
                  </td>
                </tr>
                <tr *ngIf="allSlots.length === 0">
                  <td colspan="5" class="text-center py-5 text-muted italic">No time slots found for the selected criteria.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <!-- RESERVATIONS MANAGEMENT -->
      <div *ngIf="view === 'reservations'" class="view-content">
        <div class="d-flex justify-content-between align-items-center mb-4">
          <h3 class="fw-bold m-0 text-dark">Recent Bookings</h3>
          <div class="badge bg-soft-primary text-primary px-3 py-2">{{ pendingCount }} Pending Approval</div>
        </div>

        <div class="card border-0 shadow-lg rounded-4 overflow-hidden booking-table-card">
          <div class="table-responsive">
            <table class="table table-hover align-middle mb-0">
              <thead>
                <tr>
                  <th class="ps-4 py-4 ls-1 small fw-bold text-uppercase text-muted border-0">Customer</th>
                  <th class="py-4 ls-1 small fw-bold text-uppercase text-muted border-0">Session Details</th>
                  <th class="py-4 ls-1 small fw-bold text-uppercase text-muted border-0 text-center">Date</th>
                  <th class="py-4 ls-1 small fw-bold text-uppercase text-muted border-0 text-center">Status</th>
                  <th class="pe-4 py-4 ls-1 small fw-bold text-uppercase text-muted border-0 text-center">Decision</th>
                </tr>
              </thead>
              <tbody class="border-top">
                <tr *ngFor="let r of reservations" class="reservation-row">
                  <td class="ps-4 py-3">
                    <div class="d-flex align-items-center">
                      <div class="avatar-gradient me-3">{{ r.adherent.prenom.charAt(0) }}{{ r.adherent.nom.charAt(0) }}</div>
                      <div>
                        <div class="fw-bold text-dark fs-6">{{ r.adherent.prenom }} {{ r.adherent.nom }}</div>
                        <div class="small text-muted">{{ r.adherent.email }}</div>
                      </div>
                    </div>
                  </td>
                  <td class="py-3">
                    <div class="d-flex align-items-center gap-2 mb-1">
                      <span class="badge bg-dark rounded-pill">{{ r.creneaux[0]?.terrain?.nom }}</span>
                    </div>
                    <div class="small text-secondary" *ngFor="let c of r.creneaux">
                      <i class="far fa-clock text-primary me-2"></i>{{ c.heureDebut }} - {{ c.heureFin }}
                    </div>
                  </td>
                  <td class="text-center py-3">
                    <div class="small fw-bold text-dark">{{ r.dateReservation | date:'mediumDate' }}</div>
                    <div class="small text-muted">{{ r.dateReservation | date:'shortTime' }}</div>
                  </td>
                  <td class="text-center py-3">
                    <span class="status-pill" [ngClass]="{
                      'bg-warning-soft text-warning': r.statut === 'EN_ATTENTE',
                      'bg-success-soft text-success': r.statut === 'CONFIRMEE',
                      'bg-danger-soft text-danger': r.statut === 'ANNULEE'
                    }">
                      <i class="fas fa-circle me-1 small"></i>{{ r.statut }}
                    </span>
                  </td>
                  <td class="pe-4 py-3 text-center">
                    <div class="d-flex justify-content-center gap-2" *ngIf="r.statut === 'EN_ATTENTE'">
                      <button class="btn btn-action-success" (click)="updateReservation(r.id!, 'CONFIRMEE')" title="Approve">
                        <i class="fas fa-check"></i>
                      </button>
                      <button class="btn btn-action-danger" (click)="updateReservation(r.id!, 'ANNULEE')" title="Reject">
                        <i class="fas fa-times"></i>
                      </button>
                    </div>
                    <div *ngIf="r.statut !== 'EN_ATTENTE'" class="text-muted small italic">Processed</div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <!-- Add Slot Modal Overlay -->
      <div *ngIf="showSlotForm" class="modal-overlay d-flex align-items-center justify-content-center" (click)="showSlotForm = false">
        <div class="card border-0 shadow-2xl rounded-4 p-5 animate-scale-up" style="width: 500px;" (click)="$event.stopPropagation()">
          <h4 class="fw-black mb-1">Define Availability</h4>
          <p class="text-muted small mb-4">Set a new time slot for <strong>{{ activeTerrainForSlot?.nom }}</strong></p>
          
          <div class="mb-4">
            <label class="form-label fw-bold text-dark small">Target Date</label>
            <div class="input-group">
               <span class="input-group-text bg-white border-end-0"><i class="fas fa-calendar-alt text-primary"></i></span>
               <input type="date" class="form-control border-start-0" [(ngModel)]="slotForm.date">
            </div>
          </div>
          
          <div class="row mb-4">
            <div class="col-6">
              <label class="form-label fw-bold text-dark small">Start Time</label>
              <input type="time" class="form-control" [(ngModel)]="slotForm.heureDebut">
            </div>
            <div class="col-6">
              <label class="form-label fw-bold text-dark small">End Time</label>
              <input type="time" class="form-control" [(ngModel)]="slotForm.heureFin">
            </div>
          </div>
          
          <div class="mt-2 d-grid gap-3">
            <button class="btn btn-primary-gradient py-3 fw-bold rounded-3" (click)="saveSlot()">ADD SLOT TO CALENDAR</button>
            <button class="btn btn-light py-2 fw-semibold" (click)="showSlotForm = false">DISCARD</button>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    :host { display: block; background: #f8faff; min-height: 100vh; }
    .fw-black { font-weight: 900; }
    .ls-1 { letter-spacing: 1px; }
    .bg-gradient-dark { background: linear-gradient(135deg, #1a1c23 0%, #252a34 100%); }
    .hero-card { border-radius: 2rem !important; }
    .z-1 { z-index: 1; }
    
    .glass-nav { background: rgba(255, 255, 255, 0.1); backdrop-filter: blur(10px); }
    .btn-nav { color: rgba(255, 255, 255, 0.7); border: none; font-weight: 600; transition: all 0.3s; }
    .btn-nav:hover { color: white; background: rgba(255,255,255,0.05); }
    .btn-nav.active { background: white; color: #1a1c23; shadow: 0 4px 15px rgba(0,0,0,0.2); }
    
    .badge-dot { width: 8px; height: 8px; background: #ff4757; border-radius: 50%; position: absolute; top: 10px; right: 10px; }
    
    .btn-primary-gradient { background: linear-gradient(to right, #4834d4, #686de0); color: white; border: none; transition: 0.3s; }
    .btn-primary-gradient:hover { transform: translateY(-2px); box-shadow: 0 10px 20px rgba(72, 52, 212, 0.3); }
    
    .btn-success-gradient { background: linear-gradient(to right, #20bf6b, #26de81); color: white; border: none; }
    
    .glass-form { background: rgba(255, 255, 255, 0.8); backdrop-filter: blur(20px); border: 1px solid rgba(255,255,255,0.4); }
    
    .court-card { transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275); }
    .court-card:hover { transform: translateY(-10px); box-shadow: 0 20px 40px rgba(0,0,0,0.08) !important; }
    
    .price-tag { font-size: 1.25rem; font-weight: 800; color: #4834d4; }
    .bg-soft-success { background: rgba(32, 191, 107, 0.1); }
    
    .btn-action { width: 35px; height: 35px; border-radius: 8px; display: flex; align-items: center; justify-content: center; background: #f1f2f6; border: none; transition: 0.2s; }
    .btn-action:hover { background: #e1e2e6; transform: scale(1.1); }
    
    .booking-table-card { border-radius: 1.5rem !important; }
    .avatar-gradient { width: 40px; height: 40px; background: linear-gradient(45deg, #4834d4, #686de0); color: white; border-radius: 12px; display: flex; align-items: center; justify-content: center; font-weight: bold; font-size: 0.9rem; }
    
    .status-pill { padding: 6px 16px; border-radius: 20px; font-weight: 700; font-size: 0.75rem; text-transform: uppercase; letter-spacing: 0.5px; }
    .bg-soft-primary { background: rgba(72, 52, 212, 0.1); }
    .bg-warning-soft { background: rgba(255, 159, 67, 0.1); }
    .bg-success-soft { background: rgba(32, 191, 107, 0.1); }
    .bg-danger-soft { background: rgba(235, 59, 90, 0.1); }
    
    .btn-action-success { width: 38px; height: 38px; border-radius: 10px; background: #20bf6b; color: white; border: none; transition: 0.2s; }
    .btn-action-success:hover { background: #1a9e58; transform: translateY(-2px); }
    .btn-action-danger { width: 38px; height: 38px; border-radius: 10px; background: #eb3b9e; color: white; border: none; transition: 0.2s; }
    .btn-action-danger:hover { background: #d3328b; transform: translateY(-2px); }
    
    .modal-overlay { position: fixed; top: 0; left: 0; right: 0; bottom: 0; background: rgba(0,0,0,0.6); z-index: 2000; backdrop-filter: blur(8px); }
    .animate-scale-up { animation: scaleUp 0.3s cubic-bezier(0.34, 1.56, 0.64, 1); }
    @keyframes scaleUp { from { transform: scale(0.9); opacity: 0; } to { transform: scale(1); opacity: 1; } }
    
    .spin-slow { animation: spin 15s linear infinite; }
    @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
    
    .view-content { animation: fadeIn 0.5s ease; }
    @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
    
    .line-clamp-2 { display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }
  `]
})
export class AdminDashboardComponent implements OnInit {
  view: 'terrains' | 'reservations' | 'slots' = 'terrains';
  terrains: Terrain[] = [];
  reservations: Reservation[] = [];
  allSlots: Creneau[] = [];
  pendingCount = 0;
  selectedTerrainId: number | null = null;

  // Forms
  showTerrainForm = false;
  editingTerrain: Terrain | null = null;
  terrainForm: Terrain = { nom: '', localisation: '', description: '', prix: 0, etat: 'DISPONIBLE' };

  showSlotForm = false;
  activeTerrainForSlot: Terrain | null = null;
  slotForm = { date: new Date().toISOString().split('T')[0], heureDebut: '10:00', heureFin: '11:00' };

  constructor(
    private terrainService: TerrainService,
    private reservationService: ReservationService,
    private creneauService: CreneauService
  ) { }

  ngOnInit() {
    this.loadTerrains();
    this.loadReservations();
    this.loadSlots();
  }

  loadTerrains() {
    this.terrainService.getTerrains().subscribe(data => this.terrains = data);
  }

  loadReservations() {
    this.reservationService.getAllReservations().subscribe((data: Reservation[]) => {
      this.reservations = data.sort((a, b) => new Date(b.dateReservation).getTime() - new Date(a.dateReservation).getTime());
      this.pendingCount = this.reservations.filter(r => r.statut === StatutReservation.EN_ATTENTE).length;
    });
  }

  loadSlots() {
    if (this.selectedTerrainId) {
      this.creneauService.getCreneauxByTerrain(this.selectedTerrainId).subscribe((data: Creneau[]) => this.allSlots = data);
    } else {
      this.creneauService.getAllCreneaux().subscribe((data: Creneau[]) => this.allSlots = data);
    }
  }

  switchToSlotsView() {
    this.view = 'slots';
    this.loadSlots();
  }

  editTerrain(t: Terrain) {
    this.editingTerrain = t;
    this.terrainForm = { ...t };
    this.showTerrainForm = true;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  cancelTerrainEdit() {
    this.editingTerrain = null;
    this.terrainForm = { nom: '', localisation: '', description: '', prix: 0, etat: 'DISPONIBLE' };
    this.showTerrainForm = false;
  }

  saveTerrain() {
    if (this.editingTerrain) {
      this.terrainService.updateTerrain(this.editingTerrain.id!, this.terrainForm).subscribe(() => {
        this.loadTerrains();
        this.cancelTerrainEdit();
      });
    } else {
      this.terrainService.createTerrain(this.terrainForm).subscribe(() => {
        this.loadTerrains();
        this.cancelTerrainEdit();
      });
    }
  }

  deleteTerrain(id: number) {
    if (confirm("Permanently delete this court and all associated slots?")) {
      this.terrainService.deleteTerrain(id).subscribe(() => this.loadTerrains());
    }
  }

  openSlotForm(t: Terrain) {
    this.activeTerrainForSlot = t;
    this.showSlotForm = true;
  }

  saveSlot() {
    if (!this.activeTerrainForSlot) return;
    this.creneauService.createCreneau({
      ...this.slotForm,
      terrain: { id: this.activeTerrainForSlot.id },
      estLibre: true
    }).subscribe(() => {
      this.showSlotForm = false;
      this.loadSlots();
      alert("Availability slot successfully added to " + this.activeTerrainForSlot?.nom);
    });
  }

  deleteSlot(id: number) {
    if (confirm("Delete this availability slot?")) {
      this.creneauService.deleteCreneau(id).subscribe(() => this.loadSlots());
    }
  }

  updateReservation(id: number, status: string) {
    this.reservationService.updateStatus(id, status as StatutReservation).subscribe(() => {
      this.loadReservations();
    });
  }
}
