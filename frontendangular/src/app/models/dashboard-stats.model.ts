export interface DashboardStats {
  totalReservations: number;
  totalRevenue: number;
  reservationsByStatus: { [key: string]: number };
  revenueByMonth: { [key: string]: number };
}

export interface Statistics {
  totalUsers: number;
  totalReservations: number;
  totalRevenue: number;
}
