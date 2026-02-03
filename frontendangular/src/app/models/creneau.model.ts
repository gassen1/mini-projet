import { Terrain } from './terrain.model';

export interface Creneau {
  id?: number;
  date: string; // ISO date string
  heureDebut: string; // HH:mm format
  heureFin: string; // HH:mm format
  estLibre: boolean;
  terrain?: Terrain;
}
