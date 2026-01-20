import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TerrainService } from '../../services/terrain.service';
import { ReservationService } from '../../services/reservation.service';
import { Terrain } from '../../models/terrain.model';
import { Creneau } from '../../models/creneau.model';
import { Reservation } from '../../models/reservation.model';
import { HttpClient } from '@angular/common/http';
import { PromotionService } from '../../services/promotion.service';
import { Promotion } from '../../models/promotion.model';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-user-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="container pb-5 mt-4 animate-fade-in">
      <div class="row mb-5">
        <div class="col-12">
          <div class="card bg-gradient-user text-white p-5 rounded-4 shadow-lg border-0 overflow-hidden position-relative hero-card">
            <div class="position-absolute top-50 end-0 translate-middle-y me-n5 opacity-10">
              <i class="fas fa-table-tennis fa-10x rotate-subtle"></i>
            </div>
            <div class="d-flex justify-content-between align-items-center position-relative z-1">
              <div>
                <h1 class="fw-black mb-1 display-5">Padel Space</h1>
                <p class="text-light opacity-75 fs-5 fw-light">Find the perfect court for your next game</p>
              </div>
              <div class="d-flex glass-nav p-2 rounded-pill">
                <button class="btn btn-nav px-4 py-2 rounded-pill" [class.active]="activeTab === 'booking'" (click)="activeTab = 'booking'">
                  <i class="fas fa-calendar-plus me-2"></i>Book court
                </button>
                <button class="btn btn-nav px-4 py-2 rounded-pill" [class.active]="activeTab === 'my-reservations'" (click)="activeTab = 'my-reservations'; loadMyReservations()">
                  <i class="fas fa-history me-2"></i> My history
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- BOOKING VIEW -->
      <div *ngIf="activeTab === 'booking'" class="view-content">
        <div class="row">
          <div class="col-lg-8">
            <div class="row g-4">
              <div class="col-md-6" *ngFor="let terrain of terrains">
                <div class="card h-100 border-0 shadow-sm rounded-4 overflow-hidden court-card">
                  <div class="card-header border-0 bg-transparent p-4 pb-0">
                    <div class="d-flex justify-content-between align-items-center">
                      <div class="price-tag">{{ terrain.prix }} DT/h</div>
                      <div class="badge fw-bold" [ngClass]="{
                        'bg-soft-success text-success': terrain.etat === 'DISPONIBLE',
                        'bg-soft-warning text-warning': terrain.etat === 'MAINTENANCE',
                        'bg-soft-danger text-danger': terrain.etat === 'RESERVE' || !hasAvailableSlots(terrain)
                      }">{{ terrain.etat === 'DISPONIBLE' && !hasAvailableSlots(terrain) ? 'FULL' : terrain.etat || 'DISPONIBLE' }}</div>
                    </div>
                  </div>
                  <div class="card-body p-4 pt-3">
                    <h4 class="fw-bold text-dark mb-1">{{ terrain.nom }}</h4>
                    <p class="text-muted small mb-3"><i class="fas fa-map-marker-alt text-primary me-2"></i>{{ terrain.localisation }}</p>
                    <p class="text-secondary small line-clamp-2 mb-4">{{ terrain.description }}</p>
                    
                    <hr class="opacity-10">
                    <h6 class="fw-bold mb-3 small text-uppercase ls-1 text-muted">Available Slots</h6>
                    <div class="d-flex flex-wrap gap-2" *ngIf="terrain.etat === 'DISPONIBLE' && hasAvailableSlots(terrain); else noSlots">
                      <button 
                        *ngFor="let slot of getSlots(terrain)" 
                        class="btn slot-btn"
                        [class.active]="isSelected(slot)"
                        (click)="toggleSlot(slot)"
                      >
                        {{ slot.heureDebut }} - {{ slot.heureFin }}
                      </button>
                    </div>
                    <ng-template #noSlots>
                      <div class="alert alert-light border-0 small text-center py-3 mb-0 rounded-3 text-muted">
                        <i class="fas fa-info-circle me-1"></i> 
                        {{ terrain.etat === 'MAINTENANCE' ? 'Court under maintenance' : 'No slots available' }}
                      </div>
                    </ng-template>
                  </div>
                </div>
              </div>
              
              <div class="col-12 text-center py-5" *ngIf="terrains.length === 0">
                <div class="bg-white p-5 rounded-4 d-inline-block shadow-sm">
                   <i class="fas fa-search fa-3x text-muted mb-3"></i>
                   <h5 class="fw-bold text-secondary">No courts found</h5>
                   <p class="text-muted mb-0">Check back later for available terrains.</p>
                </div>
              </div>
            </div>
          </div>

          <!-- Selection Summary Sidebar -->
          <div class="col-lg-4 mt-4 mt-lg-0">
            <div class="card shadow-2xl border-0 sticky-top" style="top: 100px; border-radius: 1.5rem;">
              <div class="card-header bg-dark text-white py-4 border-0 text-center" style="border-radius: 1.5rem 1.5rem 0 0;">
                <h5 class="mb-0 fw-bold">Your Booking Cart</h5>
              </div>
              <div class="card-body p-4">
                <div *ngIf="selectedSlots.length === 0" class="text-center py-5">
                  <div class="bg-light rounded-circle d-inline-flex align-items-center justify-content-center mb-4" style="width: 100px; height: 100px;">
                    <i class="fas fa-basketball-ball text-muted fs-1 opacity-25"></i>
                  </div>
                  <h6 class="fw-bold text-dark mb-2">Cart is empty</h6>
                  <p class="text-muted small">Pick court time slots from the list to start your reservation</p>
                </div>
                
                <div *ngIf="selectedSlots.length > 0" class="animate-fade-in">
                  <div class="selected-items-list mb-4">
                    <div *ngFor="let slot of selectedSlots" class="selected-item p-3 mb-2 rounded-3">
                      <div class="d-flex justify-content-between align-items-center">
                        <div>
                          <div class="fw-bold text-dark small">{{ slot.terrain?.nom }}</div>
                          <div class="text-muted x-small"><i class="far fa-clock me-1"></i>{{ slot.heureDebut }} - {{ slot.heureFin }}</div>
                        </div>
                        <button class="btn btn-remove" (click)="toggleSlot(slot)"><i class="fas fa-times"></i></button>
                      </div>
                    </div>
                  </div>
                  
                  <div class="summary-footer border-top pt-4">
                      <span class="text-muted fw-bold">Estimated Total</span>
                      <span class="total-price">{{ calculateTotal() | number:'1.2-2' }} DT</span>
                    </div>

                    <!-- Promo Code Section -->
                    <div class="mb-4">
                      <div class="d-flex">
                         <input type="text" class="form-control me-2" placeholder="Promo Code" [(ngModel)]="codePromo">
                         <button class="btn btn-sm btn-outline-primary" (click)="validatePromo()" [disabled]="!codePromo">Apply</button>
                      </div>
                      <div *ngIf="currentPromotion" class="text-success small mt-1">
                        -{{ currentPromotion.pourcentageReduction * 100 }}% applied!
                      </div>
                      <div *ngIf="promoError" class="text-danger small mt-1">
                        {{ promoError }}
                      </div>
                    </div>
                    <button class="btn btn-primary-gradient w-100 py-3 fw-bold rounded-3 shadow-lg fs-5" (click)="confirmBooking()" [disabled]="bookingLoading">
                      <span *ngIf="bookingLoading" class="spinner-border spinner-border-sm me-2"></span>
                      {{ bookingLoading ? 'PROCESSING...' : 'CONFIRM BOOKING' }}
                    </button>
                    <p class="text-center x-small text-muted mt-3">By clicking, you agree to our club's booking policies.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>


      <!-- MY RESERVATIONS VIEW -->
      <div *ngIf="activeTab === 'my-reservations'" class="view-content">
        <div class="card border-0 shadow-lg rounded-4 overflow-hidden">
          <div class="table-responsive">
            <table class="table table-hover align-middle mb-0">
              <thead class="bg-light">
                <tr>
                  <th class="ps-4 py-4 border-0 ls-1 x-small fw-bold text-uppercase text-muted">Court Details</th>
                  <th class="py-4 border-0 ls-1 x-small fw-bold text-uppercase text-muted">Timing</th>
                  <th class="py-4 border-0 ls-1 x-small fw-bold text-uppercase text-muted text-center">Price</th>
                   <th class="py-4 border-0 ls-1 x-small fw-bold text-uppercase text-muted text-center">Status</th>
                  <th class="py-4 border-0 ls-1 x-small fw-bold text-uppercase text-muted text-end">Booked Date</th>
                  <th class="pe-4 py-4 border-0 ls-1 x-small fw-bold text-uppercase text-muted text-end">Action</th>
                </tr>
              </thead>
              <tbody>
                <tr *ngFor="let r of myReservations" class="border-bottom-0">
                  <td class="ps-4 py-3">
                    <div class="fw-bold text-dark">{{ r.creneaux[0]?.terrain?.nom }}</div>
                    <div class="small text-muted">{{ r.creneaux[0]?.terrain?.localisation }}</div>
                  </td>
                  <td>
                    <div class="small fw-semibold text-primary" *ngFor="let c of r.creneaux">
                      <i class="far fa-calendar-alt me-2"></i>{{ c.date | date:'EEE d MMM' }} | {{ c.heureDebut }} - {{ c.heureFin }}
                    </div>
                  </td>
                  <td class="text-center fw-bold text-dark">{{ calculateReservationTotal(r) }} DT</td>
                  <td class="text-center">
                    <span class="status-pill rounded-3" [ngClass]="{
                      'bg-warning-soft text-warning': r.statut === 'EN_ATTENTE',
                      'bg-success-soft text-success': r.statut === 'CONFIRMEE',
                      'bg-danger-soft text-danger': r.statut === 'ANNULEE'
                    }">
                      {{ r.statut }}
                    </span>
                  </td>
                   <td class="text-end">
                    <div class="x-small text-muted">{{ r.dateReservation | date:'short' }}</div>
                  </td>
                  <td class="pe-4 text-end">
                    <button *ngIf="r.statut === 'EN_ATTENTE'" class="btn btn-sm btn-outline-danger border-0" (click)="cancelReservation(r.id!)">
                      <i class="fas fa-trash me-1"></i> Cancel
                    </button>
                    <span *ngIf="r.statut !== 'EN_ATTENTE'" class="text-muted small italic">Fixed</span>
                  </td>
                </tr>
                <tr *ngIf="myReservations.length === 0">
                  <td colspan="6" class="text-center py-5">
                    <div class="py-4">
                      <i class="fas fa-folder-open text-muted fs-1 mb-3"></i>
                      <p class="text-muted">You haven't made any reservations yet.</p>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    :host { display: block; background: #f8faff; min-height: 100vh; }
    .bg-gradient-user { background: linear-gradient(135deg, #1e3799 0%, #0c2461 100%); }
    .hero-card { border-radius: 2rem !important; }
    .z-1 { z-index: 1; }
    
    .glass-nav { background: rgba(255, 255, 255, 0.1); backdrop-filter: blur(10px); }
    .btn-nav { color: rgba(255, 255, 255, 0.7); border: none; font-weight: 600; transition: all 0.3s; }
    .btn-nav:hover { color: white; background: rgba(255,255,255,0.05); }
    .btn-nav.active { background: white; color: #1e3799; shadow: 0 4px 15px rgba(0,0,0,0.2); }
    
    .court-card { transition: all 0.4s ease; border: 1px solid transparent !important; }
    .court-card:hover { transform: translateY(-10px); box-shadow: 0 20px 40px rgba(0,0,0,0.08) !important; border-color: #1e3799 !important; }
    
    .price-tag { font-size: 1.3rem; font-weight: 800; color: #1e3799; }
    .bg-soft-primary { background: rgba(30, 55, 153, 0.1); }
    
    .slot-btn { border: 2px solid #edeff5; background: white; color: #6c757d; font-weight: bold; border-radius: 12px; padding: 10px 15px; transition: 0.2s; }
    .slot-btn:hover { border-color: #1e3799; color: #1e3799; transform: scale(1.05); }
    .slot-btn.active { background: #1e3799; color: white; border-color: #1e3799; shadow: 0 4px 15px rgba(30, 55, 153, 0.3); }
    
    .selected-item { background: #f8faff; border: 1px solid #edeff5; }
    .btn-remove { width: 28px; height: 28px; background: #fff; color: #ff4757; border-radius: 50%; border: none; display: flex; align-items: center; justify-content: center; font-size: 0.8rem; box-shadow: 0 2px 5px rgba(0,0,0,0.1); transition: 0.2s; }
    .btn-remove:hover { background: #ff4757; color: white; }
    
    .total-price { font-size: 2rem; font-weight: 900; color: #1e3799; font-family: 'Outfit'; }
    .btn-primary-gradient { background: linear-gradient(to right, #1e3799, #4834d4); color: white; border: none; transition: 0.3s; }
    .btn-primary-gradient:hover { transform: translateY(-3px); box-shadow: 0 15px 30px rgba(30, 55, 153, 0.3); }
    
    .status-pill { padding: 8px 16px; font-weight: 700; font-size: 0.75rem; text-transform: uppercase; }
    .bg-warning-soft { background: rgba(255, 159, 67, 0.1); }
    .bg-success-soft { background: rgba(32, 191, 107, 0.1); }
    .bg-danger-soft { background: rgba(235, 59, 90, 0.1); }
    
    .rotate-subtle { animation: rotateSubtle 30s linear infinite; }
    @keyframes rotateSubtle { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
    
    .ls-1 { letter-spacing: 1px; }
    .x-small { font-size: 0.7rem; }
    .line-clamp-2 { display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }
    .view-content { animation: fadeIn 0.5s ease; }
    @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
  `]
})
export class UserDashboardComponent implements OnInit {
  activeTab: 'booking' | 'my-reservations' = 'booking';
  terrains: Terrain[] = [];
  availableSlots: { [key: number]: Creneau[] } = {};
  selectedSlots: Creneau[] = [];
  myReservations: Reservation[] = [];
  bookingLoading = false;

  codePromo: string = '';
  currentPromotion: Promotion | null = null;
  promoError: string = '';

  constructor(
    private terrainService: TerrainService,
    private reservationService: ReservationService,
    private promotionService: PromotionService,
    private http: HttpClient
  ) { }

  ngOnInit() {
    this.loadTerrains();
  }

  loadTerrains() {
    this.terrainService.getTerrains().subscribe(data => {
      this.terrains = data;
      this.terrains.forEach(t => this.loadSlots(t));
    });
  }

  loadSlots(terrain: Terrain) {
    this.http.get<Creneau[]>(`http://localhost:8081/api/creneaux/terrain/${terrain.id}`).subscribe(slots => {
      slots.forEach(s => s.terrain = terrain);
      this.availableSlots[terrain.id!] = slots;
    });
  }

  loadMyReservations() {
    this.reservationService.getMyReservations().subscribe(data => {
      this.myReservations = data;
    });
  }

  hasAvailableSlots(terrain: Terrain): boolean {
    return !!terrain.id && this.availableSlots[terrain.id] && this.availableSlots[terrain.id].length > 0;
  }

  getSlots(terrain: Terrain): Creneau[] {
    return terrain.id ? this.availableSlots[terrain.id] || [] : [];
  }

  isSelected(slot: Creneau): boolean {
    return this.selectedSlots.some(s => s.id === slot.id);
  }

  toggleSlot(slot: Creneau) {
    const index = this.selectedSlots.findIndex(s => s.id === slot.id);
    if (index > -1) {
      this.selectedSlots.splice(index, 1);
    } else {
      this.selectedSlots.push(slot);
    }
  }

  calculateTotal(): number {
    const base = this.selectedSlots.reduce((sum, slot) => sum + (slot.terrain?.prix || 0), 0);
    if (this.currentPromotion) {
      return base * (1 - this.currentPromotion.pourcentageReduction);
    }
    return base;
  }

  validatePromo() {
    this.promoError = '';
    this.currentPromotion = null;
    if (!this.codePromo) return;

    this.promotionService.validate(this.codePromo).subscribe({
      next: (promo) => {
        this.currentPromotion = promo;
        this.promoError = '';
      },
      error: () => {
        this.promoError = 'Invalid or expired code';
        this.currentPromotion = null;
      }
    });
  }

  calculateReservationTotal(res: Reservation): number {
    return res.creneaux.reduce((sum, slot) => sum + (slot.terrain?.prix || 0), 0);
  }

  confirmBooking() {
    if (this.selectedSlots.length === 0) return;
    this.bookingLoading = true;
    const ids = this.selectedSlots.map(s => s.id!);
    this.reservationService.createReservation(ids, this.currentPromotion ? this.codePromo : undefined).subscribe({
      next: () => {
        alert('Reservation submitted successfully! Your booking is now PENDING administrator approval.');
        this.selectedSlots = [];
        this.bookingLoading = false;
        this.loadTerrains();
        if (this.activeTab === 'my-reservations') this.loadMyReservations();
      },
      error: () => {
        alert('Error creating reservation. One of your selected slots might have been taken just now.');
        this.bookingLoading = false;
      }
    });
  }

  cancelReservation(id: number) {
    if (confirm("Are you sure you want to cancel this reservation?")) {
      this.reservationService.cancelReservation(id).subscribe(() => {
        this.loadMyReservations();
        this.loadTerrains(); // Refresh slots
      });
    }
  }
}
