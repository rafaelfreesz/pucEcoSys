const pool = require('../db');

class FornecedorRepository{

    consultarTodos(){

        return new Promise((resolve, reject) => {
            
            pool.query('SELECT * FROM tb_fornecedor ORDER BY ID ASC',
                (err,res)=>{        
                    if(err) return reject(err);
                    return resolve(res.rows);
                    //TODO preencherEnderecos(res.rows);
                
            })
        })
            
    };

    consultarPorId(id){

        return new Promise((resolve, reject) => {

            pool.query('SELECT * FROM tb_fornecedor WHERE id = $1',[id],
                (err,res)=>{        
                    if(err) return reject(err);
                    return resolve(res.rows);    
                    //TODO await preencherEnderecos(res.rows);
                                                
            })

        })

    };

    incluir(fornecedor){

        return new Promise((resolve, reject) => {

            pool.query('INSERT INTO tb_fornecedor(cnpj, razao_social, nome_empresarial) VALUES ($1,$2,$3) RETURNING *',
                [
                    fornecedor.cnpj, 
                    fornecedor.razao_social, 
                    fornecedor.nome_empresarial
                ],
                (err,res)=>{
                    if(err) return reject(err);
                    return resolve();
                    //TODO await cadastrarEndereco(endereco, res.rows[0].id)
                }
            );
        
        })

    };

    alterar(id, fornecedor){

        return new Promise((resolve, reject) =>{
            const keys = ['cnpj', 'razao_social', 'nome_empresarial'];
        
            const fields = [];
        
            keys.forEach(key => {
                if(fornecedor[key]) fields.push(key);
            })
        
            fields.forEach((field,index) => {
                
                pool.query(`UPDATE tb_fornecedor SET ${field} = ($1) WHERE id = ($2)`,
                    [fornecedor[field], id],
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
            pool.query('DELETE FROM tb_fornecedor WHERE id = $1',[id],(err,res)=>{
                if(err) return reject(err);
                return resolve();
            })
        })
    };

}

module.exports.FornecedorRepository = new FornecedorRepository();