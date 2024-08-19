const {pool, executarQuery} = require('../db');

class ItemVendaRepository{

    consultarTodos(){
        const sql = 'SELECT * FROM tb_item_venda ORDER BY id ASC';
        return executarQuery(sql);
    }

    consultarPorId(id){
        const sql = 'SELECT * FROM tb_item_venda WHERE id = $1';
        return executarQuery(sql,[id]);
    }

    consultarPorVenda(fk_venda){
        const sql = 'SELECT * FROM tb_item_venda WHERE fk_venda = $1';
        return executarQuery(sql,[fk_venda]);
    }

    
    incluir(item_venda){
        const sql = 'INSERT INTO tb_item_venda(fk_produto, fk_venda, quantidade) VALUES ($1,$2,$3)';
        
        return executarQuery(sql,
            [
                item_venda.fk_produto,
                item_venda.fk_venda,
                item_venda.quantidade
            ])
    }

    // async alterar(id,entrada){

    //     const keys = ['fk_produto', 'fk_entrada', 'quantidade', 'preco_compra'];
    //     const fields = [];
    
    //     keys.forEach(key => {
    //         if(entrada[key]) fields.push(key);
    //     })

    //     for (let i = 0; i < fields.length; i++){

    //         const sql = `UPDATE tb_item_entrada SET ${fields[i]} = ($1) WHERE id = ($2)`;
    
    //         if(i === fields.length - 1){
    //             return executarQuery(sql,[entrada[fields[i]],id]);
    //         }else{
    //             await executarQuery(sql,[entrada[fields[i]],id]);
    //         }
        
    //     }

    // }

    // excluirPorId(id){
    //     const sql = 'DELETE FROM tb_item_entrada WHERE id = $1'
    //     return executarQuery(sql,[id]);
    // }

    // TODO Implementar consulta por fornecedor consultarPorFornecedor(fkFornecedor){
    //     const sql = 'SELECT * FROM tb_contato WHERE fk_fornecedor = $1';
    //     return executarQuery(sql,[fkFornecedor]);
    // }


    // consultarPorProduto(fk_produto){ Ainda nao eh necessario
    //     const sql = 'SELECT * FROM tb_item_entrada WHERE fk_produto = $1';
    //     return executarQuery(sql,[fk_produto]);
    // }
}

module.exports.ItemVendaRepository = new ItemVendaRepository();