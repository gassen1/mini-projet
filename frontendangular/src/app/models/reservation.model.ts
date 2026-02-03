import { User } from './user.model';
import { Creneau } from './creneau.model';
import { Promotion } from './promotion.model';

export enum StatutReservation {
  EN_ATTENTE = 'EN_ATTENTE',
  CONFIRMEE = 'CONFIRMEE',
  ANNULEE = 'ANNULEE'
}

export interface Reservation {
  id?: number;
  dateReservation: string; // ISO datetime string
  statut: StatutReservation;
  prixFinal?: number;
  promotion?: Promotion;
  adherent?: User;
  creneaux?: Creneau[];
}
