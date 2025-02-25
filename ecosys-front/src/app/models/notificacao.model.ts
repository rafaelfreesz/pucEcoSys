export class Notificacao{
    public nome_produto = "";
    public qtd_estoque = 0;
    
    public status = () => {

        if (this.qtd_estoque === 0){
             return "Vazio";
        }else{
            return "Baixo"
        }
    }
}