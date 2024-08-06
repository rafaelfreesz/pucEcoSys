const {pool, executarQuery} = require('../db');

class VendaRepository{

    consultarTodos(){
        const sql = 'SELECT * FROM tb_venda ORDER BY id ASC';
        return executarQuery(sql);
    }

    // consultarPorId(id){
    //     const sql = 'SELECT * FROM tb_contato WHERE id = $1';
    //     return executarQuery(sql,[id]);
    // }

    // consultarPorFornecedor(fkFornecedor){
    //     const sql = 'SELECT * FROM tb_contato WHERE fk_fornecedor = $1';
    //     return executarQuery(sql,[fkFornecedor]);
    // }

    // incluir(contato){
    //     const sql = 'INSERT INTO tb_contato(tipo,valor,fk_fornecedor) VALUES ($1,$2,$3)';
        
    //     return executarQuery(sql,
    //         [
    //             contato.tipo,
    //             contato.valor,
    //             contato.fk_fornecedor
    //         ])
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

module.exports.VendaRepository = new VendaRepository();