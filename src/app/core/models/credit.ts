import { StatutCredit } from "../enums/statut-credit";
import { Remboursement } from "./remboursement";

export interface Credit {
  id?: number;
  dateDemande: Date;
  statut: StatutCredit;
  dateAcceptation?: Date;
  montant: number;
  dureeRemboursement: number;
  tauxInteret: number;
  clientId: number;
  remboursements?: Remboursement[];
}