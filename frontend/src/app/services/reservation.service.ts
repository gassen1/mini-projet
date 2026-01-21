import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Reservation, StatutReservation } from '../models/reservation.model';
import { environment } from '../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class ReservationService {
    private apiUrl = `${environment.apiUrl}/reservations`;

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

    getStats(): Observable<any> {
        return this.http.get<any>(`${this.apiUrl}/stats`);
    }
}
