import { Contato } from "./contato.model";
import { Endereco } from "./endereco.model";

export class Fornecedor{
    private _id?: number = -1; 
    public cnpj: string = "";
    public razao_social: string = "";
    public nome_empresarial: string = "";
    public endereco: Endereco = new Endereco();
    public contatos: Contato[] = [];   

    get id(): number{
        return this._id? this._id : -1;
    }

    set id(value: number){
        this._id = value
    }
}
