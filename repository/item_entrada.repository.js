const {pool, executarQuery} = require('../db');

class ItemEntradaRepository{

    consultarTodos(){
        const sql = 'SELECT * FROM tb_item_entrada ORDER BY id ASC';
        return executarQuery(sql);
    }
    consultarPorId(id){
        const sql = 'SELECT * FROM tb_item_entrada WHERE id = $1';
        return executarQuery(sql,[id]);
    }

    consultarPorEntrada(fk_entrada){
        const sql = 'SELECT * FROM tb_item_entrada WHERE fk_entrada = $1';
        return executarQuery(sql,[fk_entrada]);
    }

    // consultarPorProduto(fk_produto){ Ainda nao eh necessario
    //     const sql = 'SELECT * FROM tb_item_entrada WHERE fk_produto = $1';
    //     return executarQuery(sql,[fk_produto]);
    // }

    
    incluir(item_entrada){
        const sql = 'INSERT INTO tb_item_entrada(fk_produto, fk_entrada, quantidade, preco_compra) VALUES ($1,$2,$3)';
        
        return executarQuery(sql,
            [
                item_entrada.fk_produto,
                item_entrada.fk_entrada,
                item_entrada.quantidade,
                item_entrada.preco_compra
            ])
    }

    // async alterar(id,entrada){

    //     const keys = ['dt_hr_entrada','nu_nota_fiscal','fk_fornecedor'];
    //     const fields = [];
    
    //     keys.forEach(key => {
    //         if(entrada[key]) fields.push(key);
    //     })

    //     for (let i = 0; i < fields.length; i++){

    //         const sql = `UPDATE tb_entrada SET ${fields[i]} = ($1) WHERE id = ($2)`;
    
    //         if(i === fields.length - 1){
    //             return executarQuery(sql,[entrada[fields[i]],id]);
    //         }else{
    //             await executarQuery(sql,[entrada[fields[i]],id]);
    //         }
        
    //     }

    // }

    // excluirPorId(id){
    //     const sql = 'DELETE FROM tb_entrada WHERE id = $1'
    //     return executarQuery(sql,[id]);
    // }
    // TODO Implementar consulta por fornecedor consultarPorFornecedor(fkFornecedor){
    //     const sql = 'SELECT * FROM tb_contato WHERE fk_fornecedor = $1';
    //     return executarQuery(sql,[fkFornecedor]);
    // }

}

module.exports.ItemEntradaRepository = new ItemEntradaRepository();