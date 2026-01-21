package com.padel.reservation.repository;

import com.padel.reservation.entity.Creneau;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface CreneauRepository extends JpaRepository<Creneau, Long> {
    List<Creneau> findByTerrainIdAndEstLibreTrue(Long terrainId);
    List<Creneau> findByTerrainId(Long terrainId);
}
