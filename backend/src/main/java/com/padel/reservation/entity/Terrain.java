package com.padel.reservation.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "terrains")
public class Terrain {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nom;
    private String description;
    private String localisation;
    private Double prix;
    private String etat; // e.g., "DISPONIBLE", "MAINTENANCE"

    public Terrain() {}

    public Terrain(Long id, String nom, String description, String localisation, Double prix, String etat) {
        this.id = id;
        this.nom = nom;
        this.description = description;
        this.localisation = localisation;
        this.prix = prix;
        this.etat = etat;
    }

    public static TerrainBuilder builder() {
        return new TerrainBuilder();
    }

    public static class TerrainBuilder {
        private Long id;
        private String nom;
        private String description;
        private String localisation;
        private Double prix;
        private String etat;

        public TerrainBuilder id(Long id) { this.id = id; return this; }
        public TerrainBuilder nom(String nom) { this.nom = nom; return this; }
        public TerrainBuilder description(String description) { this.description = description; return this; }
        public TerrainBuilder localisation(String localisation) { this.localisation = localisation; return this; }
        public TerrainBuilder prix(Double prix) { this.prix = prix; return this; }
        public TerrainBuilder etat(String etat) { this.etat = etat; return this; }

        public Terrain build() {
            return new Terrain(id, nom, description, localisation, prix, etat);
        }
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getNom() { return nom; }
    public void setNom(String nom) { this.nom = nom; }
    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }
    public String getLocalisation() { return localisation; }
    public void setLocalisation(String localisation) { this.localisation = localisation; }
    public Double getPrix() { return prix; }
    public void setPrix(Double prix) { this.prix = prix; }
    public String getEtat() { return etat; }
    public void setEtat(String etat) { this.etat = etat; }
}
