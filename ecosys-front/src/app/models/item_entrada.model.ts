import { Entrada } from "./entrada.model";
import { Produto } from "./produto.model";

export class ItemEntrada{
    id?: number = -1;
    quantidade: number = -1;
    preco_compra: number = -1;
    produto: Produto | null = null;
    fk_entrada: number = -1;
    valor_total_item = (): number => {return this.preco_compra*this.quantidade}
    
}