package com.padel.reservation.scheduler;

import com.padel.reservation.entity.Creneau;
import com.padel.reservation.entity.Terrain;
import com.padel.reservation.repository.CreneauRepository;
import com.padel.reservation.repository.TerrainRepository;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

@Component
public class ReservationScheduler {

    private final CreneauRepository creneauRepository;
    private final TerrainRepository terrainRepository;

    public ReservationScheduler(CreneauRepository creneauRepository, TerrainRepository terrainRepository) {
        this.creneauRepository = creneauRepository;
        this.terrainRepository = terrainRepository;
    }

    @Scheduled(fixedRate = 60000) // Every minute
    public void updateTerrainStatus() {
        List<Terrain> terrains = terrainRepository.findAll();
        LocalDate today = LocalDate.now();
        LocalTime now = LocalTime.now();

        for (Terrain terrain : terrains) {
            // Ignore maintenance
            if ("MAINTENANCE".equals(terrain.getEtat())) {
                continue;
            }

            List<Creneau> activeCreneaux = creneauRepository.findByTerrainId(terrain.getId());
            boolean isCurrentlyOccupied = false;

            for (Creneau creneau : activeCreneaux) {
                if (creneau.getDate().equals(today) && 
                    !creneau.isEstLibre() && 
                    now.isAfter(creneau.getHeureDebut()) && 
                    now.isBefore(creneau.getHeureFin())) {
                    isCurrentlyOccupied = true;
                    break;
                }
            }

            String newStatus = isCurrentlyOccupied ? "RESERVE" : "DISPONIBLE";
            if (!newStatus.equals(terrain.getEtat())) {
                terrain.setEtat(newStatus);
                terrainRepository.save(terrain);
                System.out.println("Terrain " + terrain.getNom() + " status updated to: " + newStatus);
            }
        }
    }
}
