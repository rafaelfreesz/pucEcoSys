import { Contato } from "./contato.model";
import { Endereco } from "./endereco.model";

export class Fornecedor{
    public id?: number = -1;
    public cnpj: string = "";
    public razao_social: string = "";
    public nome_empresarial: string = "";
    public qtd_estoque: number = 0;
    public endereco: Endereco | null = null;
    public contatos: Contato[] = [];   
}
