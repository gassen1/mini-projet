package com.padel.reservation.service;

import com.padel.reservation.entity.Terrain;
import com.padel.reservation.repository.TerrainRepository;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class TerrainService {

    private final TerrainRepository terrainRepository;

    public TerrainService(TerrainRepository terrainRepository) {
        this.terrainRepository = terrainRepository;
    }

    public List<Terrain> getAllTerrains() {
        return terrainRepository.findAll();
    }

    public Terrain getTerrainById(Long id) {
        return terrainRepository.findById(id).orElseThrow(() -> new RuntimeException("Terrain not found"));
    }

    public Terrain saveTerrain(Terrain terrain) {
        return terrainRepository.save(terrain);
    }

    public void deleteTerrain(Long id) {
        terrainRepository.deleteById(id);
    }

    public Terrain updateTerrain(Long id, Terrain terrainDetails) {
        Terrain terrain = getTerrainById(id);
        terrain.setNom(terrainDetails.getNom());
        terrain.setDescription(terrainDetails.getDescription());
        terrain.setLocalisation(terrainDetails.getLocalisation());
        terrain.setPrix(terrainDetails.getPrix());
        terrain.setEtat(terrainDetails.getEtat());
        return terrainRepository.save(terrain);
    }
}
