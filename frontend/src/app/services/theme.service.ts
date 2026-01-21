import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ThemeService {
    private darkMode = new BehaviorSubject<boolean>(this.getInitialMode());
    darkMode$ = this.darkMode.asObservable();

    constructor() {
        this.applyTheme(this.darkMode.value);
    }

    private getInitialMode(): boolean {
        const saved = localStorage.getItem('darkMode');
        if (saved !== null) {
            return saved === 'true';
        }
        return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }

    toggleDarkMode() {
        const newValue = !this.darkMode.value;
        this.darkMode.next(newValue);
        localStorage.setItem('darkMode', newValue.toString());
        this.applyTheme(newValue);
    }

    private applyTheme(isDark: boolean) {
        if (isDark) {
            document.documentElement.classList.add('dark-mode');
        } else {
            document.documentElement.classList.remove('dark-mode');
        }
    }
}
