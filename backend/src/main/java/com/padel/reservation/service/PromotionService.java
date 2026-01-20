package com.padel.reservation.service;

import com.padel.reservation.entity.Promotion;
import com.padel.reservation.repository.PromotionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class PromotionService {

    @Autowired
    private PromotionRepository promotionRepository;

    public List<Promotion> getAllPromotions() {
        return promotionRepository.findAll();
    }

    public Promotion createPromotion(Promotion promotion) {
        return promotionRepository.save(promotion);
    }

    public Promotion getPromotionById(Long id) {
        return promotionRepository.findById(id).orElseThrow(() -> new RuntimeException("Promotion not found"));
    }

    public void deletePromotion(Long id) {
        promotionRepository.deleteById(id);
    }

    public Optional<Promotion> getValidPromotion(String code) {
        Optional<Promotion> promoOpt = promotionRepository.findByCode(code);
        if (promoOpt.isPresent()) {
            Promotion promo = promoOpt.get();
            LocalDateTime now = LocalDateTime.now();
            if (promo.isActif() && now.isAfter(promo.getDateDebut()) && now.isBefore(promo.getDateFin())) {
                return Optional.of(promo);
            }
        }
        return Optional.empty();
    }
}
