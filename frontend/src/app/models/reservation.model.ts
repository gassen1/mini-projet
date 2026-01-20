import { Creneau } from "./creneau.model";
import { User } from "./user.model";

import { Promotion } from "./promotion.model";

export enum StatutReservation {
    EN_ATTENTE = 'EN_ATTENTE',
    CONFIRMEE = 'CONFIRMEE',
    ANNULEE = 'ANNULEE'
}

export interface Reservation {
    id?: number;
    dateReservation: string;
    statut: StatutReservation;
    adherent: User;
    creneaux: Creneau[];
    prixFinal?: number;
    promotion?: Promotion;
}
