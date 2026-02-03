import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Creneau } from '../models/creneau.model';

@Injectable({
  providedIn: 'root'
})
export class CreneauService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getAvailableCreneauxByTerrain(terrainId: number): Observable<Creneau[]> {
    return this.http.get<Creneau[]>(`${this.apiUrl}/creneaux/terrain/${terrainId}`);
  }

  getAllCreneaux(): Observable<Creneau[]> {
    return this.http.get<Creneau[]>(`${this.apiUrl}/creneaux`);
  }

  createCreneau(creneau: Creneau): Observable<Creneau> {
    return this.http.post<Creneau>(`${this.apiUrl}/creneaux`, creneau);
  }

  deleteCreneau(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/creneaux/${id}`);
  }
}
