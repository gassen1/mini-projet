export interface Promotion {
    id?: number;
    code: string;
    pourcentageReduction: number;
    dateDebut: string;
    dateFin: string;
    actif: boolean;
}
