import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Promotion } from '../models/promotion.model';
import { environment } from '../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class PromotionService {
    private apiUrl = `${environment.apiUrl}/promotions`;

    constructor(private http: HttpClient) { }

    getAll(): Observable<Promotion[]> {
        return this.http.get<Promotion[]>(this.apiUrl);
    }

    create(promotion: Promotion): Observable<Promotion> {
        return this.http.post<Promotion>(this.apiUrl, promotion);
    }

    delete(id: number): Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}/${id}`);
    }

    validate(code: string): Observable<Promotion> {
        return this.http.get<Promotion>(`${this.apiUrl}/validate/${code}`);
    }
}
