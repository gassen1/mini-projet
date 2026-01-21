package com.padel.reservation.repository;

import com.padel.reservation.entity.Reservation;
import com.padel.reservation.entity.StatutReservation;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface ReservationRepository extends JpaRepository<Reservation, Long> {
    List<Reservation> findByAdherentId(Long adherentId);
    long countByAdherentIdAndStatut(Long adherentId, StatutReservation statut);
}
