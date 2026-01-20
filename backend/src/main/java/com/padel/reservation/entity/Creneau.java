package com.padel.reservation.entity;

import jakarta.persistence.*;
import java.time.LocalDate;
import java.time.LocalTime;

@Entity
@Table(name = "creneaux")
public class Creneau {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private LocalDate date;
    private LocalTime heureDebut;
    private LocalTime heureFin;
    private boolean estLibre = true;

    @ManyToOne
    @JoinColumn(name = "terrain_id")
    private Terrain terrain;

    public Creneau() {}

    public Creneau(Long id, LocalDate date, LocalTime heureDebut, LocalTime heureFin, boolean estLibre, Terrain terrain) {
        this.id = id;
        this.date = date;
        this.heureDebut = heureDebut;
        this.heureFin = heureFin;
        this.estLibre = estLibre;
        this.terrain = terrain;
    }

    public static CreneauBuilder builder() {
        return new CreneauBuilder();
    }

    public static class CreneauBuilder {
        private Long id;
        private LocalDate date;
        private LocalTime heureDebut;
        private LocalTime heureFin;
        private boolean estLibre = true;
        private Terrain terrain;

        public CreneauBuilder id(Long id) { this.id = id; return this; }
        public CreneauBuilder date(LocalDate date) { this.date = date; return this; }
        public CreneauBuilder heureDebut(LocalTime heureDebut) { this.heureDebut = heureDebut; return this; }
        public CreneauBuilder heureFin(LocalTime heureFin) { this.heureFin = heureFin; return this; }
        public CreneauBuilder estLibre(boolean estLibre) { this.estLibre = estLibre; return this; }
        public CreneauBuilder terrain(Terrain terrain) { this.terrain = terrain; return this; }

        public Creneau build() {
            return new Creneau(id, date, heureDebut, heureFin, estLibre, terrain);
        }
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public LocalDate getDate() { return date; }
    public void setDate(LocalDate date) { this.date = date; }
    public LocalTime getHeureDebut() { return heureDebut; }
    public void setHeureDebut(LocalTime heureDebut) { this.heureDebut = heureDebut; }
    public LocalTime getHeureFin() { return heureFin; }
    public void setHeureFin(LocalTime heureFin) { this.heureFin = heureFin; }
    public boolean isEstLibre() { return estLibre; }
    public void setEstLibre(boolean estLibre) { this.estLibre = estLibre; }
    public Terrain getTerrain() { return terrain; }
    public void setTerrain(Terrain terrain) { this.terrain = terrain; }
}
