import { SafeUrl } from "@angular/platform-browser";

export class Produto{
    public id?: number = -1;
    public nome: string = "";
    public descricao: string = "";
    public preco_venda: number = 0;
    public qtd_estoque: number = 0;   
    public imagem: string = "";
    public imagemURL: SafeUrl = "";

}