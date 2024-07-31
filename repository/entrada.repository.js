const {pool, executarQuery} = require('../db');

class EntradaRepository{

    consultarTodos(){
        const sql = 'SELECT * FROM tb_entrada ORDER BY id ASC';
        return executarQuery(sql);
    }
    consultarPorId(id){
        const sql = 'SELECT * FROM tb_entrada WHERE id = $1';
        return executarQuery(sql,[id]);
    }

    
    incluir(entrada){
        const sql = 'INSERT INTO tb_entrada(dt_hr_entrada,nu_nota_fiscal, fk_fornecedor) VALUES ($1,$2,$3)';
        
        return executarQuery(sql,
            [
                entrada.dt_hr_entrada,
                entrada.nu_nota_fiscal,
                entrada.fk_fornecedor
            ])
        }

    // TODO Implementar consulta por fornecedor consultarPorFornecedor(fkFornecedor){
    //     const sql = 'SELECT * FROM tb_contato WHERE fk_fornecedor = $1';
    //     return executarQuery(sql,[fkFornecedor]);
    // }
    // async alterar(id,contato){

    //     const keys = ['tipo','valor'];
    //     const fields = [];
    
    //     keys.forEach(key => {
    //         if(contato[key]) fields.push(key);
    //     })

    //     for (let i = 0; i < fields.length; i++){

    //         const sql = `UPDATE tb_contato SET ${fields[i]} = ($1) WHERE id = ($2)`;
    
    //         if(i === fields.length - 1){
    //             return executarQuery(sql,[contato[fields[i]],id]);
    //         }else{
    //             await executarQuery(sql,[contato[fields[i]],id]);
    //         }
        
    //     }

    // }

    // excluirPorId(id){
    //     const sql = 'DELETE FROM tb_contato WHERE id = $1'
    //     return executarQuery(sql,[id]);
    // }
}

module.exports.EntradaRepository = new EntradaRepository();