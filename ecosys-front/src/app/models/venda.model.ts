import { ItemVenda } from "./item_venda.model";

export class Venda{
    private _id?: number = -1; 
    public dt_hr_venda: string = "";
    public items_venda: ItemVenda [] = [];

    get id(): number{
        return this._id? this._id : -1;
    }

    set id(value: number){
        this._id = value
    }

    valor_total_nota = () => {
        let total = 0
        for(const item of this.items_venda){
            total+= item.valor_total_item();
        }
        return total;
    }
}
