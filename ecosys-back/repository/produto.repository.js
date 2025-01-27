const {pool, executarQuery} = require('../db');

class ProdutoRepository{
    //CRUD
    consultarTodos(){
        const sql = 'SELECT * FROM tb_produto ORDER BY id ASC';
        return executarQuery(sql);
    };

    consultarPorId(id){
        const sql = 'SELECT * FROM tb_produto WHERE id = $1';
        return executarQuery(sql,[id]);

    };

    incluir(produto){
        const sql = 'INSERT INTO tb_produto(nome, descricao, preco_venda, qtd_estoque) VALUES ($1,$2,$3,0)';
        return executarQuery(sql,
            [
                produto.nome,
                produto.descricao,
                produto.preco_venda
            ])
    };

    async alterar(id, produto){
        
        const keys = ['nome', 'descricao', 'preco_venda','qtd_estoque'];
        const fields = [];
    
        keys.forEach(key => {
            if(produto[key]) fields.push(key);
        })

        for (let i = 0; i < fields.length; i++){

            const sql = `UPDATE tb_produto SET ${fields[i]} = ($1) WHERE id = ($2)`;
            
            if(i === fields.length - 1){
                return executarQuery(sql,[produto[fields[i]],id]);
            }else{
                await executarQuery(sql,[produto[fields[i]],id]);
            }
        
        }

    };

    excluirPorId(id){
        const sql = 'DELETE FROM tb_produto WHERE id = $1'
        return executarQuery(sql,[id]);
    };
}

module.exports.ProdutoRepository = new ProdutoRepository();