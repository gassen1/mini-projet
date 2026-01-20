package com.padel.reservation.dto;

import java.util.List;

public class ReservationRequest {
    private List<Long> creneauIds;

    private String codePromo;

    public ReservationRequest() {}

    public ReservationRequest(List<Long> creneauIds, String codePromo) {
        this.creneauIds = creneauIds;
        this.codePromo = codePromo;
    }

    public List<Long> getCreneauIds() { return creneauIds; }
    public void setCreneauIds(List<Long> creneauIds) { this.creneauIds = creneauIds; }

    public String getCodePromo() { return codePromo; }
    public void setCodePromo(String codePromo) { this.codePromo = codePromo; }
}
