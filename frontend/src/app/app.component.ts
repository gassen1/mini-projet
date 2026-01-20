import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './components/navbar/navbar.component';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [CommonModule, RouterOutlet, NavbarComponent],
    template: `
    <app-navbar></app-navbar>
    <main class="container">
      <router-outlet></router-outlet>
    </main>
    <footer class="text-center py-4 text-muted border-top mt-5">
      &copy; 2026 Padel Pro Reservation System - Mini Projet Spring Boot & Angular
    </footer>
  `
})
export class AppComponent { }
