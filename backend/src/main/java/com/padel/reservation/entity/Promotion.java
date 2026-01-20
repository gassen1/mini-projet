package com.padel.reservation.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "promotions")
public class Promotion {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true, nullable = false)
    private String code;

    private Double pourcentageReduction; // e.g., 0.20 for 20%

    private LocalDateTime dateDebut;
    private LocalDateTime dateFin;

    private boolean actif = true;

    public Promotion() {}

    public Promotion(Long id, String code, Double pourcentageReduction, LocalDateTime dateDebut, LocalDateTime dateFin, boolean actif) {
        this.id = id;
        this.code = code;
        this.pourcentageReduction = pourcentageReduction;
        this.dateDebut = dateDebut;
        this.dateFin = dateFin;
        this.actif = actif;
    }

    public static PromotionBuilder builder() {
        return new PromotionBuilder();
    }

    public static class PromotionBuilder {
        private Long id;
        private String code;
        private Double pourcentageReduction;
        private LocalDateTime dateDebut;
        private LocalDateTime dateFin;
        private boolean actif = true;

        public PromotionBuilder id(Long id) { this.id = id; return this; }
        public PromotionBuilder code(String code) { this.code = code; return this; }
        public PromotionBuilder pourcentageReduction(Double pourcentageReduction) { this.pourcentageReduction = pourcentageReduction; return this; }
        public PromotionBuilder dateDebut(LocalDateTime dateDebut) { this.dateDebut = dateDebut; return this; }
        public PromotionBuilder dateFin(LocalDateTime dateFin) { this.dateFin = dateFin; return this; }
        public PromotionBuilder actif(boolean actif) { this.actif = actif; return this; }

        public Promotion build() {
            return new Promotion(id, code, pourcentageReduction, dateDebut, dateFin, actif);
        }
    }

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getCode() { return code; }
    public void setCode(String code) { this.code = code; }
    public Double getPourcentageReduction() { return pourcentageReduction; }
    public void setPourcentageReduction(Double pourcentageReduction) { this.pourcentageReduction = pourcentageReduction; }
    public LocalDateTime getDateDebut() { return dateDebut; }
    public void setDateDebut(LocalDateTime dateDebut) { this.dateDebut = dateDebut; }
    public LocalDateTime getDateFin() { return dateFin; }
    public void setDateFin(LocalDateTime dateFin) { this.dateFin = dateFin; }
    public boolean isActif() { return actif; }
    public void setActif(boolean actif) { this.actif = actif; }
}
