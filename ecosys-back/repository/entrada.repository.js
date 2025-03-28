const {pool, executarQuery} = require('../db');

class EntradaRepository{

    consultarTodos(){
        const sql = 'SELECT * FROM tb_entrada ORDER BY dt_hr_entrada DESC';
        return executarQuery(sql);
    }
    consultarPorId(id){
        const sql = 'SELECT * FROM tb_entrada WHERE id = $1';
        return executarQuery(sql,[id]);
    }

    
    incluir(entrada){
        const sql = 'INSERT INTO tb_entrada(dt_hr_entrada,nu_nota_fiscal, fk_fornecedor) VALUES ($1,$2,$3) returning *';
        
        return executarQuery(sql,
            [
                entrada.dt_hr_entrada,
                entrada.nu_nota_fiscal,
                entrada.fk_fornecedor
            ])
        }

        async alterar(id,entrada){
    
            const keys = ['dt_hr_entrada','nu_nota_fiscal','fk_fornecedor'];
            const fields = [];
        
            keys.forEach(key => {
                if(entrada[key]) fields.push(key);
            })
    
            for (let i = 0; i < fields.length; i++){
    
                const sql = `UPDATE tb_entrada SET ${fields[i]} = ($1) WHERE id = ($2)`;
        
                if(i === fields.length - 1){
                    return executarQuery(sql,[entrada[fields[i]],id]);
                }else{
                    await executarQuery(sql,[entrada[fields[i]],id]);
                }
            
            }
    
        }

        excluirPorId(id){
            const sql = 'DELETE FROM tb_entrada WHERE id = $1'
            return executarQuery(sql,[id]);
        }
    // TODO Implementar consulta por fornecedor consultarPorFornecedor(fkFornecedor){
    //     const sql = 'SELECT * FROM tb_contato WHERE fk_fornecedor = $1';
    //     return executarQuery(sql,[fkFornecedor]);
    // }

}

module.exports.EntradaRepository = new EntradaRepository();