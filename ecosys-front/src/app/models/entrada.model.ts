import { Fornecedor } from "./fornecedor.model";
import { ItemEntrada } from "./item_entrada.model";

export class Entrada{
    id?: number = -1;
    dt_hr_entrada: string = "";
    nu_nota_fiscal: string="";
    fornecedor: Fornecedor | null = null;
    items_entrada: ItemEntrada[] = []
    
    valor_total_nota = () => {
        let total = 0
        for(const entrada of this.items_entrada){
            total+=entrada.valor_total_item();
        }
        return total;
    }
}