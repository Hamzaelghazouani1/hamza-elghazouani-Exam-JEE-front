import { TypeRemboursement } from "../enums/type-remboursement";

export interface Remboursement {
  id?: number;
  date: Date;
  montant: number;
  type: TypeRemboursement;
  creditId: number;
}