import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Creneau } from '../models/creneau.model';

@Injectable({
    providedIn: 'root'
})
export class CreneauService {
    private apiUrl = 'http://localhost:8081/api/creneaux';

    constructor(private http: HttpClient) { }

    getAllCreneaux(): Observable<Creneau[]> {
        return this.http.get<Creneau[]>(this.apiUrl);
    }

    getCreneauxByTerrain(terrainId: number): Observable<Creneau[]> {
        return this.http.get<Creneau[]>(`${this.apiUrl}/terrain/${terrainId}`);
    }

    createCreneau(creneau: any): Observable<Creneau> {
        return this.http.post<Creneau>(this.apiUrl, creneau);
    }

    deleteCreneau(id: number): Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}/${id}`);
    }
}
