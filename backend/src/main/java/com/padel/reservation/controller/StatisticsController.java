package com.padel.reservation.controller;

import com.padel.reservation.entity.Reservation;
import com.padel.reservation.repository.ReservationRepository;
import com.padel.reservation.repository.UserRepository;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/statistics")
public class StatisticsController {

    private final ReservationRepository reservationRepository;
    private final UserRepository userRepository;

    public StatisticsController(ReservationRepository reservationRepository, UserRepository userRepository) {
        this.reservationRepository = reservationRepository;
        this.userRepository = userRepository;
    }

    @GetMapping
    @PreAuthorize("hasRole('ADMIN')")
    public Map<String, Object> getStats() {
        Map<String, Object> stats = new HashMap<>();
        long userCount = userRepository.count();
        List<Reservation> reservations = reservationRepository.findAll();
        double totalRevenue = reservations.stream()
                .filter(r -> r.getPrixFinal() != null)
                .mapToDouble(Reservation::getPrixFinal)
                .sum();
        
        stats.put("totalUsers", userCount);
        stats.put("totalReservations", reservations.size());
        stats.put("totalRevenue", totalRevenue);
        
        return stats;
    }
}
