package com.padel.reservation.controller;

import com.padel.reservation.dto.ReservationRequest;
import com.padel.reservation.entity.Reservation;
import com.padel.reservation.entity.StatutReservation;
import com.padel.reservation.entity.User;
import com.padel.reservation.service.ReservationService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import com.padel.reservation.dto.DashboardStats;
import java.util.List;

@RestController
@RequestMapping("/api/reservations")
public class ReservationController {

    private final ReservationService service;

    public ReservationController(ReservationService service) {
        this.service = service;
    }

    @GetMapping("/stats")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<DashboardStats> getStats() {
        return ResponseEntity.ok(service.getDashboardStats());
    }

    @PostMapping
    public ResponseEntity<Reservation> create(
            @AuthenticationPrincipal User user,
            @RequestBody ReservationRequest request
    ) {
        return ResponseEntity.ok(service.createReservation(user, request.getCreneauIds(), request.getCodePromo()));
    }

    @GetMapping("/my")
    public List<Reservation> getMyReservations(@AuthenticationPrincipal User user) {
        return service.getAdherentReservations(user.getId());
    }

    @GetMapping
    @PreAuthorize("hasRole('ADMIN')")
    public List<Reservation> getAll() {
        return service.getAllReservations();
    }

    @PatchMapping("/{id}/status")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Reservation> updateStatus(
            @PathVariable Long id,
            @RequestParam StatutReservation status
    ) {
        return ResponseEntity.ok(service.updateStatus(id, status));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> cancel(
            @AuthenticationPrincipal User user,
            @PathVariable Long id
    ) {
        service.cancelReservation(user, id);
        return ResponseEntity.noContent().build();
    }
}
