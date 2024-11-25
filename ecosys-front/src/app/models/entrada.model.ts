import { Fornecedor } from "./fornecedor.model";

export class Entrada{
    id?: number = -1;
    dt_hr_entrada: string = "";
    nu_nota_fiscal: string="";
    fornecedor: Fornecedor | null = null;
}