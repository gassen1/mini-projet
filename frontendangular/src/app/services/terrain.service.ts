import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Terrain } from '../models/terrain.model';

@Injectable({
  providedIn: 'root'
})
export class TerrainService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getAllTerrains(): Observable<Terrain[]> {
    return this.http.get<Terrain[]>(`${this.apiUrl}/terrains`);
  }

  getTerrainById(id: number): Observable<Terrain> {
    return this.http.get<Terrain>(`${this.apiUrl}/terrains/${id}`);
  }

  createTerrain(terrain: Terrain): Observable<Terrain> {
    return this.http.post<Terrain>(`${this.apiUrl}/terrains`, terrain);
  }

  updateTerrain(id: number, terrain: Terrain): Observable<Terrain> {
    return this.http.put<Terrain>(`${this.apiUrl}/terrains/${id}`, terrain);
  }

  deleteTerrain(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/terrains/${id}`);
  }
}
