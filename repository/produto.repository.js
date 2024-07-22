const pool = require('../db');

class ProdutoRepository{
    //CRUD
    consultarTodos(){
        
        return new Promise((resolve,reject) =>{
            pool.query('SELECT * FROM tb_produto ORDER BY id ASC',
                (err,res)=>{        
                    if(err) return reject("ERRO:"+err);
                    return resolve(res.rows);
                })
        })
        
    
    };

    consultarPorId(id){
        
        return new Promise((resolve, reject) =>{

            pool.query('SELECT * FROM tb_produto WHERE id = $1',[id],(err,res)=>{        
                if(err) return reject(err);
                return resolve(res.rows);
            })

        })

    };

    incluir(produto){

        return new Promise((resolve,reject) =>{

            pool.query('INSERT INTO tb_produto(nome, descricao, preco_venda, qtd_estoque) VALUES ($1,$2,$3,0)',
                [   produto.nome,
                    produto.descricao,
                    produto.preco_venda
                ],
                (err,res)=>{
                    if(err) return reject(err);
                    return resolve();
                }
            );

        })
    };

    alterar(id, produto){
        const keys = ['nome', 'descricao', 'preco_venda'];
    
        const fields = [];
    
        keys.forEach(key => {
            if(produto[key]) fields.push(key);
        })

        return new Promise((resolve, reject)=>{
            
            fields.forEach((field,index) => {
                
                pool.query(`UPDATE tb_produto SET ${field} = ($1) WHERE id = ($2)`,
                    [produto[field], id],
                    (err,res)=>{
                        if(err) return reject(err);
            
                        if(index === fields.length - 1) return resolve();
                    }
                );
                
            })
        
        })


    };

    excluirPorId(id){

        return new Promise((resolve, reject) => {

            pool.query('DELETE FROM tb_produto WHERE id = $1',[id],(err,res)=>{
                if(err) return reject(err);
                return resolve();
            })

        })
    };
}

module.exports.ProdutoRepository = new ProdutoRepository();