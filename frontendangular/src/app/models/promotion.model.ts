export interface Promotion {
  id?: number;
  code: string;
  pourcentageReduction: number;
  dateDebut: string; // ISO datetime string
  dateFin: string; // ISO datetime string
  actif: boolean;
}
