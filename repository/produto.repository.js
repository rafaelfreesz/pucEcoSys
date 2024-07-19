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

    consultarPorId(){};
    incluir(){};
    alterar(){};
    deletar(){};
}

module.exports.ProdutoRepository = new ProdutoRepository();