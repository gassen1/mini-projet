export enum Role {
  ADMIN = 'ADMIN',
  ADHERENT = 'ADHERENT'
}

export interface User {
  id?: number;
  nom: string;
  prenom: string;
  email: string;
  telephone?: string;
  role: Role;
}

export interface AuthResponse {
  token: string;
  email: string;
  role: Role;
}
