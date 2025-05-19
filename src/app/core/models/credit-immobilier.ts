import { TypeBien } from "../enums/type-bien";
import { Credit } from "./client";

export interface CreditImmobilier extends Credit {
  typeBien: TypeBien;
}
