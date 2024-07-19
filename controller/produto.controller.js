const pool = require('../db');
const {ProdutoRepository} = require('../repository/produto.repository')

class ProdutoController {

    consultarTodos(request, response, next) {
        ProdutoRepository.consultarTodos()
            .then(retorno => {response.json(retorno)})
            .catch(erro => {console.log(erro)})
    }

    consultarPorId(request, response, next) {
        pool.query('SELECT * FROM tb_produto WHERE id = $1',[request.params['id']],(err,res)=>{        
            if(err) return next(err);
            response.json(res.rows);
        })
    }

    incluir(request, response, next) {


        const {nome, descricao, preco_venda, qtd_estoque} = request.body;
    
        pool.query('INSERT INTO tb_produto(nome, descricao, preco_venda, qtd_estoque) VALUES ($1,$2,$3,0)',
            [nome, descricao, preco_venda],
            (err,res)=>{
                if(err) return next(err);
    
                response.redirect('/produtos');
            }
        );
    }

    alterar(request, response, next) {

        const {id} = request.params;
    
        const keys = ['nome', 'descricao', 'preco_venda'];
    
        const fields = [];
    
        keys.forEach(key => {
            if(request.body[key]) fields.push(key);
        })
    
        fields.forEach((field,index) => {
            
            pool.query(`UPDATE tb_produto SET ${field} = ($1) WHERE id = ($2)`,
                [request.body[field], id],
                (err,res)=>{
                    if(err) return next(err);
        
                    if(index === fields.length - 1) response.redirect('/produtos');
                }
            );
            
        })
    }

    excluirPorId(request, response, next) {
        pool.query('DELETE FROM tb_produto WHERE id = $1',[request.params['id']],(err,res)=>{
            if(err) return next(err);
            response.redirect('/produtos');
        })
    }

}

//Padrão Singleton
module.exports.ProdutoController = new ProdutoController()