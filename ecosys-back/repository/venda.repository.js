const {pool, executarQuery} = require('../db');

class VendaRepository{

    consultarTodos(){
        const sql = 'SELECT * FROM tb_venda ORDER BY id ASC';
        return executarQuery(sql);
    }

    consultarPorId(id){
        const sql = 'SELECT * FROM tb_venda WHERE id = $1';
        return executarQuery(sql,[id]);
    }

    incluir(venda){
        const sql = 'INSERT INTO tb_venda(dt_hr_venda) VALUES ($1)';
        
        return executarQuery(sql,
            [
                venda.dt_hr_venda
            ])
    }

    async alterar(id,contato){

        const keys = ['dt_hr_venda'];
        const fields = [];
    
        keys.forEach(key => {
            if(contato[key]) fields.push(key);
        })

        for (let i = 0; i < fields.length; i++){

            const sql = `UPDATE tb_venda SET ${fields[i]} = ($1) WHERE id = ($2)`;
    
            if(i === fields.length - 1){
                return executarQuery(sql,[contato[fields[i]],id]);
            }else{
                await executarQuery(sql,[contato[fields[i]],id]);
            }
        
        }

    }

    excluirPorId(id){
        const sql = 'DELETE FROM tb_venda WHERE id = $1'
        return executarQuery(sql,[id]);
    }
}

module.exports.VendaRepository = new VendaRepository();