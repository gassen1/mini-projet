import { Terrain } from "./terrain.model";

export interface Creneau {
    id?: number;
    date: string;
    heureDebut: string;
    heureFin: string;
    estLibre: boolean;
    terrain?: Terrain;
}
