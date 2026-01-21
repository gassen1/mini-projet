import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { AuthResponse, Role } from '../models/user.model';
import { environment } from '../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private apiUrl = `${environment.apiUrl}/auth`;
    private currentUserSubject = new BehaviorSubject<AuthResponse | null>(null);

    constructor(private http: HttpClient) {
        const savedUser = localStorage.getItem('currentUser');
        if (savedUser) {
            this.currentUserSubject.next(JSON.parse(savedUser));
        }
    }

    public get currentUserValue(): AuthResponse | null {
        return this.currentUserSubject.value;
    }

    register(nom: string, prenom: string, email: string, telephone: string, password?: string): Observable<AuthResponse> {
        return this.http.post<AuthResponse>(`${this.apiUrl}/register`, { nom, prenom, email, telephone, password });
    }

    login(email: string, password: string): Observable<AuthResponse> {
        return this.http.post<AuthResponse>(`${this.apiUrl}/authenticate`, { email, password })
            .pipe(tap(user => {
                localStorage.setItem('currentUser', JSON.stringify(user));
                this.currentUserSubject.next(user);
            }));
    }

    logout() {
        localStorage.removeItem('currentUser');
        this.currentUserSubject.next(null);
    }

    isAdmin(): boolean {
        return this.currentUserValue?.role === Role.ADMIN;
    }

    isAuthenticated(): boolean {
        return !!this.currentUserValue;
    }
}
