package com.padel.reservation.dto;

import java.util.Map;

public class DashboardStats {
    private long totalReservations;
    private double totalRevenue;
    private Map<String, Long> reservationsByStatus;
    private Map<String, Double> revenueByMonth;

    public DashboardStats(long totalReservations, double totalRevenue, Map<String, Long> reservationsByStatus, Map<String, Double> revenueByMonth) {
        this.totalReservations = totalReservations;
        this.totalRevenue = totalRevenue;
        this.reservationsByStatus = reservationsByStatus;
        this.revenueByMonth = revenueByMonth;
    }

    // Getters
    public long getTotalReservations() { return totalReservations; }
    public double getTotalRevenue() { return totalRevenue; }
    public Map<String, Long> getReservationsByStatus() { return reservationsByStatus; }
    public Map<String, Double> getRevenueByMonth() { return revenueByMonth; }
}
