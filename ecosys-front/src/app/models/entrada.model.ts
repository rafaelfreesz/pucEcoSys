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
        for(const item of this.items_entrada){
            total+= item.in_excluir? 0: item.valor_total_item();
        }
        return total;
    }
}