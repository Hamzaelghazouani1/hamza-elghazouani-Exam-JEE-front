export interface Credit {
  id?: number;
  montant?: number;
  dateDebut?: Date;
  dateFin?: Date;
}

export interface Client {
  id?: number;
  nom: string;
  email: string;
  credits?: Credit[];
}
