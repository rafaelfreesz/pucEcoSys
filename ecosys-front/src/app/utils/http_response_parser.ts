import { Contato } from "../models/contato.model";
import { Endereco } from "../models/endereco.model";
import { Entrada } from "../models/entrada.model";
import { Fornecedor } from "../models/fornecedor.model";
import { ItemEntrada } from "../models/item_entrada.model";
import { Produto } from "../models/produto.model";

export abstract class HTTPResponseParser{
    
    //Builders de lista
    static buildListaProduto(resposta: any){
        const produtos: Produto[] = []

        for (const resp of resposta){
            produtos.push(HTTPResponseParser.buildProdutoFromResposta(resp))
        }

        return produtos
    }

    static buildListaFornecedor(resposta: any){
        const fornecedores: Fornecedor[] = []
        for (const resp of resposta){
            fornecedores.push(HTTPResponseParser.buildFornecedorFromResposta(resp))
        }

        return fornecedores
    }

    static buildListaEntradas(resposta: any){
        const entradas: Entrada[] = []

        for (const resp of resposta){
            entradas.push(HTTPResponseParser.buildEntradaFromResposta(resp))
            
        }

        return entradas
    }
    
    //Conversores Resposta - Objeto
    static buildFornecedorFromResposta(resposta: any):Fornecedor{
        const fornecedor = new Fornecedor();
        fornecedor.id = resposta.id;
        fornecedor.cnpj = resposta.cnpj;
        fornecedor.razao_social = resposta.razao_social;
        fornecedor.nome_empresarial= resposta.nome_empresarial
        fornecedor.endereco = HTTPResponseParser.buildEnderecoFromResposta(resposta.endereco);

        for(let contato of resposta.contatos){
            fornecedor.contatos.push(HTTPResponseParser.buildContatoFromResposta(contato));
        }
        

        return fornecedor;
    }

    static buildEnderecoFromResposta(resposta: any): Endereco{
        const endereco = new Endereco();
            
        endereco.id = resposta.id;
        endereco.logradouro = resposta.logradouro;
        endereco.numero = resposta.numero;
        endereco.complemento = resposta.complemento;
        endereco.cep = resposta.cep;
        endereco.bairro = resposta.bairro;
        endereco.cidade = resposta.cidade;
        endereco.estado = resposta.estado;

        return endereco;
    }

    static buildContatoFromResposta(resposta: any): Contato{
            
        const contato = new Contato();

        contato.id = resposta.id;
        contato.tipo = resposta.tipo;
        contato.valor = resposta.valor;

        return contato;
    }

    static buildProdutoFromResposta(resposta: any): Produto{
            
        const produto:Produto = new Produto();

        produto.id = resposta.id;
        produto.nome = resposta.nome;
        produto.descricao = resposta.descricao;
        produto.qtd_estoque= resposta.qtd_estoque
        produto.preco_venda = resposta.preco_venda;

        return produto;
    }

    static buildEntradaFromResposta(resposta: any): Entrada{
        const entrada: Entrada = new Entrada();

        entrada.id = resposta.id;
        entrada.dt_hr_entrada = resposta.dt_hr_entrada;
        entrada.nu_nota_fiscal = resposta.nu_nota_fiscal;
        
        entrada.fornecedor = HTTPResponseParser.buildFornecedorFromResposta(resposta.fornecedor)

        for(const resp of resposta.items){
            entrada.items_entrada.push(HTTPResponseParser.buildItemEntradaFromResposta(resp))
        }

        return entrada
    }

    static buildItemEntradaFromResposta(resposta: any): ItemEntrada{
        const item_entrada: ItemEntrada = new ItemEntrada();

        item_entrada.id = resposta.id;
        item_entrada.quantidade = resposta.quantidade;
        item_entrada.preco_compra = resposta.preco_compra;
        item_entrada.fk_entrada = resposta.fk_entrada;
        
        item_entrada.produto = HTTPResponseParser.buildProdutoFromResposta(resposta.produto)

        return item_entrada
    }
}