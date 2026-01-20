import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Reservation, StatutReservation } from '../models/reservation.model';

@Injectable({
    providedIn: 'root'
})
export class ReservationService {
    private apiUrl = 'http://localhost:8081/api/reservations';

    constructor(private http: HttpClient) { }

    createReservation(creneauIds: number[], codePromo?: string): Observable<Reservation> {
        return this.http.post<Reservation>(this.apiUrl, { creneauIds, codePromo });
    }

    getMyReservations(): Observable<Reservation[]> {
        return this.http.get<Reservation[]>(`${this.apiUrl}/my`);
    }

    getAllReservations(): Observable<Reservation[]> {
        return this.http.get<Reservation[]>(this.apiUrl);
    }

    updateStatus(id: number, status: StatutReservation): Observable<Reservation> {
        return this.http.patch<Reservation>(`${this.apiUrl}/${id}/status?status=${status}`, {});
    }

    cancelReservation(id: number): Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}/${id}`);
    }
}
