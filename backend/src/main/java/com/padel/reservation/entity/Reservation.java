package com.padel.reservation.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "reservations")
public class Reservation {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private LocalDateTime dateReservation;

    @Enumerated(EnumType.STRING)
    private StatutReservation statut;

    private Double prixFinal;

    @ManyToOne
    @JoinColumn(name = "promotion_id")
    private Promotion promotion;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User adherent;

    @OneToMany
    @JoinTable(
        name = "reservation_creneaux",
        joinColumns = @JoinColumn(name = "reservation_id"),
        inverseJoinColumns = @JoinColumn(name = "creneau_id")
    )
    private List<Creneau> creneaux;

    public Reservation() {}

    public Reservation(Long id, LocalDateTime dateReservation, StatutReservation statut, Double prixFinal, Promotion promotion, User adherent, List<Creneau> creneaux) {
        this.id = id;
        this.dateReservation = dateReservation;
        this.statut = statut;
        this.prixFinal = prixFinal;
        this.promotion = promotion;
        this.adherent = adherent;
        this.creneaux = creneaux;
    }

    public static ReservationBuilder builder() {
        return new ReservationBuilder();
    }

    public static class ReservationBuilder {
        private Long id;
        private LocalDateTime dateReservation;
        private StatutReservation statut;
        private Double prixFinal;
        private Promotion promotion;
        private User adherent;
        private List<Creneau> creneaux;

        public ReservationBuilder id(Long id) { this.id = id; return this; }
        public ReservationBuilder dateReservation(LocalDateTime dateReservation) { this.dateReservation = dateReservation; return this; }
        public ReservationBuilder statut(StatutReservation statut) { this.statut = statut; return this; }
        public ReservationBuilder prixFinal(Double prixFinal) { this.prixFinal = prixFinal; return this; }
        public ReservationBuilder promotion(Promotion promotion) { this.promotion = promotion; return this; }
        public ReservationBuilder adherent(User adherent) { this.adherent = adherent; return this; }
        public ReservationBuilder creneaux(List<Creneau> creneaux) { this.creneaux = creneaux; return this; }

        public Reservation build() {
            return new Reservation(id, dateReservation, statut, prixFinal, promotion, adherent, creneaux);
        }
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public LocalDateTime getDateReservation() { return dateReservation; }
    public void setDateReservation(LocalDateTime dateReservation) { this.dateReservation = dateReservation; }
    public StatutReservation getStatut() { return statut; }
    public void setStatut(StatutReservation statut) { this.statut = statut; }
    public User getAdherent() { return adherent; }
    public void setAdherent(User adherent) { this.adherent = adherent; }
    public List<Creneau> getCreneaux() { return creneaux; }
    public void setCreneaux(List<Creneau> creneaux) { this.creneaux = creneaux; }

    public Double getPrixFinal() { return prixFinal; }
    public void setPrixFinal(Double prixFinal) { this.prixFinal = prixFinal; }
    public Promotion getPromotion() { return promotion; }
    public void setPromotion(Promotion promotion) { this.promotion = promotion; }
}
