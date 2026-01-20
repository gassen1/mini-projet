package com.padel.reservation.service;

import com.padel.reservation.entity.Creneau;
import com.padel.reservation.repository.CreneauRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CreneauService {

    private final CreneauRepository creneauRepository;

    public CreneauService(CreneauRepository creneauRepository) {
        this.creneauRepository = creneauRepository;
    }

    public List<Creneau> getAllCreneaux() {
        return creneauRepository.findAll();
    }

    public List<Creneau> getAvailableCreneauxByTerrain(Long terrainId) {
        return creneauRepository.findByTerrainIdAndEstLibreTrue(terrainId);
    }

    public Creneau saveCreneau(Creneau creneau) {
        return creneauRepository.save(creneau);
    }

    public void deleteCreneau(Long id) {
        creneauRepository.deleteById(id);
    }

    public Creneau getCreneauById(Long id) {
        return creneauRepository.findById(id).orElseThrow(() -> new RuntimeException("Creneau not found"));
    }
}
