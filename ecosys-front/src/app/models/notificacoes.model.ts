export class Notificacoes{
    public nome_produto = "";
    public qtd_estoque = 0;
    
    public status = () => {

        if (this.qtd_estoque === 0){
             return "Sem estoque";
        }else{
            return "Estoque baixo"
        }
    }
}