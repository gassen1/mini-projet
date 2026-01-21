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
import java.util.Map;
import java.util.stream.Collectors;
import com.padel.reservation.dto.DashboardStats;

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
                throw new RuntimeException("SLOT_ALREADY_RESERVED: The slot " + c.getHeureDebut() + " is no longer available.");
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

        // Loyalty Logic: -10% if user has 5+ confirmed reservations
        long confirmedCount = reservationRepository.countByAdherentIdAndStatut(adherent.getId(), StatutReservation.CONFIRMEE);
        if (confirmedCount >= 5) {
            totalPrice = totalPrice * 0.9;
            System.out.println("Loyalty discount applied for " + adherent.getEmail() + " (Confirmed matches: " + confirmedCount + ")");
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

    public DashboardStats getDashboardStats() {
        List<Reservation> all = reservationRepository.findAll();
        
        long totalReservations = all.size();
        double totalRevenue = all.stream()
                .filter(r -> r.getStatut() == StatutReservation.CONFIRMEE)
                .mapToDouble(Reservation::getPrixFinal)
                .sum();
                
        Map<String, Long> statusMap = all.stream()
                .collect(Collectors.groupingBy(r -> r.getStatut().name(), Collectors.counting()));
                
        // Simplified month mapping for demo
        Map<String, Double> revenueByMonth = all.stream()
                .filter(r -> r.getStatut() == StatutReservation.CONFIRMEE)
                .collect(Collectors.groupingBy(
                        r -> r.getDateReservation().getMonth().name(),
                        Collectors.summingDouble(Reservation::getPrixFinal)
                ));
                
        return new DashboardStats(totalReservations, totalRevenue, statusMap, revenueByMonth);
    }
}
