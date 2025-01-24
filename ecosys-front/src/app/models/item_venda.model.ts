import { Produto } from "./produto.model";

export class ItemVenda{
    private _id?: number = -1; 
    public produto: Produto | null = null;
    public quantidade: number = 0;
    public fk_venda: number = -1;

    get id(): number{
        return this._id? this._id : -1;
    }

    set id(value: number){
        this._id = value
    }

    valor_total_item(): number{
        return this.produto? this.produto.preco_venda*this.quantidade : 0;
    }
}
