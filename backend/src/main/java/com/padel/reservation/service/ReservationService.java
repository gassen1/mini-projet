package com.padel.reservation.service;

import com.padel.reservation.entity.Creneau;
import com.padel.reservation.entity.Reservation;
import com.padel.reservation.entity.Role;
import com.padel.reservation.entity.StatutReservation;
import com.padel.reservation.entity.User;
import com.padel.reservation.repository.CreneauRepository;
import com.padel.reservation.repository.ReservationRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class ReservationService {

    private final ReservationRepository reservationRepository;
    private final CreneauRepository creneauRepository;
    private final PromotionService promotionService;

    public ReservationService(ReservationRepository reservationRepository, CreneauRepository creneauRepository, PromotionService promotionService) {
        this.reservationRepository = reservationRepository;
        this.creneauRepository = creneauRepository;
        this.promotionService = promotionService;
    }

    @Transactional
    public Reservation createReservation(User adherent, List<Long> creneauIds, String codePromo) {
        List<Creneau> creneaux = creneauRepository.findAllById(creneauIds);
        
        if (creneaux.isEmpty()) {
            throw new RuntimeException("No slots selected");
        }

        double totalPrice = 0.0;
        // Check if all creneaux are free and calculate price
        for (Creneau c : creneaux) {
            if (!c.isEstLibre()) {
                throw new RuntimeException("One of the slots is already reserved");
            }
            if (c.getTerrain() != null) {
                totalPrice += c.getTerrain().getPrix();
            }
        }

        // Apply Promotion
        com.padel.reservation.entity.Promotion promotion = null;
        if (codePromo != null && !codePromo.isEmpty()) {
            promotion = promotionService.getValidPromotion(codePromo).orElse(null);
            if (promotion != null) {
                totalPrice = totalPrice * (1 - promotion.getPourcentageReduction());
            }
        }

        // Mark as reserved
        creneaux.forEach(c -> c.setEstLibre(false));
        creneauRepository.saveAll(creneaux);

        Reservation reservation = Reservation.builder()
                .adherent(adherent)
                .creneaux(creneaux)
                .dateReservation(LocalDateTime.now())
                .statut(StatutReservation.EN_ATTENTE)
                .prixFinal(totalPrice)
                .promotion(promotion)
                .build();

        return reservationRepository.save(reservation);
    }

    public List<Reservation> getAllReservations() {
        return reservationRepository.findAll();
    }

    public List<Reservation> getAdherentReservations(Long userId) {
        return reservationRepository.findByAdherentId(userId);
    }

    @Transactional
    public void cancelReservation(User user, Long reservationId) {
        Reservation reservation = reservationRepository.findById(reservationId)
                .orElseThrow(() -> new RuntimeException("Reservation not found"));
        
        // Security check: only the owner or an admin can cancel
        if (!reservation.getAdherent().getId().equals(user.getId()) && user.getRole() != Role.ADMIN) {
            throw new RuntimeException("Unauthorized to cancel this reservation");
        }

        // Release the slots
        reservation.getCreneaux().forEach(c -> c.setEstLibre(true));
        creneauRepository.saveAll(reservation.getCreneaux());
        
        reservationRepository.delete(reservation);
    }

    public Reservation updateStatus(Long reservationId, StatutReservation status) {
        Reservation reservation = reservationRepository.findById(reservationId)
                .orElseThrow(() -> new RuntimeException("Reservation not found"));
        
        reservation.setStatut(status);
        
        // If cancelled, release the slots
        if (status == StatutReservation.ANNULEE) {
            reservation.getCreneaux().forEach(c -> c.setEstLibre(true));
            creneauRepository.saveAll(reservation.getCreneaux());
        }
        
        return reservationRepository.save(reservation);
    }
}
