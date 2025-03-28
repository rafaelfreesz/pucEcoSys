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
        const sql = 'INSERT INTO tb_item_venda(fk_produto, fk_venda, quantidade, preco_unitario) VALUES ($1,$2,$3,$4)';
        
        return executarQuery(sql,
            [
                item_venda.fk_produto,
                item_venda.fk_venda,
                item_venda.quantidade,
                item_venda.preco_unitario
            ])
    }

    async alterar(id,entrada){

        const keys = ['fk_produto', 'fk_venda', 'quantidade','preco_unitario'];
        const fields = [];
    
        keys.forEach(key => {
            if(entrada[key]) fields.push(key);
        })

        for (let i = 0; i < fields.length; i++){

            const sql = `UPDATE tb_item_venda SET ${fields[i]} = ($1) WHERE id = ($2)`;
    
            if(i === fields.length - 1){
                return executarQuery(sql,[entrada[fields[i]],id]);
            }else{
                await executarQuery(sql,[entrada[fields[i]],id]);
            }
        
        }

    }

    excluirPorId(id){
        const sql = 'DELETE FROM tb_item_venda WHERE id = $1'
        return executarQuery(sql,[id]);
    }
    
}

module.exports.ItemVendaRepository = new ItemVendaRepository();