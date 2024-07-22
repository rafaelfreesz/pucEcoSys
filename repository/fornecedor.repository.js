const {pool, executarQuery} = require('../db');

class FornecedorRepository{

    consultarTodos(){
        const sql = 'SELECT * FROM tb_fornecedor ORDER BY ID ASC';
        return executarQuery(sql);            
    };

    consultarPorId(id){
        const sql = 'SELECT * FROM tb_fornecedor WHERE id = $1'
        //TODO await preencherEnderecos(res.rows);
        return executarQuery(sql,[id]);

    };

    incluir(fornecedor){
        const sql = 'INSERT INTO tb_fornecedor(cnpj, razao_social, nome_empresarial) VALUES ($1,$2,$3) RETURNING *'
        return executarQuery(sql,
            [
                fornecedor.cnpj, 
                fornecedor.razao_social, 
                fornecedor.nome_empresarial
            ]);
        

    };

    async alterar(id, fornecedor){

        const keys = ['cnpj', 'razao_social', 'nome_empresarial'];
        const fields = [];
        
        keys.forEach(key => {
            if(fornecedor[key]) fields.push(key);
        })

        for (let i = 0; i < fields.length; i++){

            const sql = `UPDATE tb_fornecedor SET ${fields[i]} = ($1) WHERE id = ($2)`;
    
            if(i === fields.length - 1){
                return executarQuery(sql,[fornecedor[fields[i]],id]);
            }else{
                await executarQuery(sql,[fornecedor[fields[i]],id]);
            }
        
        }

    };
    
    excluirPorId(id){
        const sql = 'DELETE FROM tb_fornecedor WHERE id = $1'
        return executarQuery(sql,[id]);
    };

}

module.exports.FornecedorRepository = new FornecedorRepository();