package com.padel.reservation.controller;

import com.padel.reservation.entity.Creneau;
import com.padel.reservation.service.CreneauService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/creneaux")
public class CreneauController {

    private final CreneauService creneauService;

    public CreneauController(CreneauService creneauService) {
        this.creneauService = creneauService;
    }

    @GetMapping("/terrain/{terrainId}")
    public List<Creneau> getAvailable(@PathVariable Long terrainId) {
        return creneauService.getAvailableCreneauxByTerrain(terrainId);
    }

    @GetMapping
    @PreAuthorize("hasRole('ADMIN')")
    public List<Creneau> getAll() {
        return creneauService.getAllCreneaux();
    }

    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Creneau> create(@RequestBody Creneau creneau) {
        return ResponseEntity.ok(creneauService.saveCreneau(creneau));
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        creneauService.deleteCreneau(id);
        return ResponseEntity.noContent().build();
    }
}
