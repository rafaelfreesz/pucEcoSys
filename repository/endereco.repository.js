const {pool, executarQuery} = require('../db');

class EnderecoRepository{

    consultarTodos(){
        const sql = 'SELECT * FROM tb_endereco ORDER BY id ASC';
        return executarQuery(sql);
    }
    consultarPorId(id){
        const sql = 'SELECT * FROM tb_endereco WHERE id = $1';
        return executarQuery(sql,[id]);
    }

    incluir(endereco){
        const sql = 'INSERT INTO tb_endereco(logradouro,numero,complemento,fk_fornecedor) VALUES ($1,$2,$3,$4)';
        return executarQuery(sql,
            [
                endereco.logradouro,
                endereco.numero,
                endereco.complemento,
                endereco.fk_fornecedor
            ])
    }

    async alterar(id,endereco){

        const keys = ['logradouro','numero','complemento','fk_fornecedor'];
        const fields = [];
    
        keys.forEach(key => {
            if(endereco[key]) fields.push(key);
        })

        for (let i = 0; i < fields.length; i++){

            const sql = `UPDATE tb_endereco SET ${fields[i]} = ($1) WHERE id = ($2)`;
    
            if(i === fields.length - 1){
                return executarQuery(sql,[endereco[fields[i]],id]);
            }else{
                await executarQuery(sql,[endereco[fields[i]],id]);
            }
        
        }

    }

    excluirPorId(id){
        const sql = 'DELETE FROM tb_endereco WHERE id = $1'
        return executarQuery(sql,[id]);
    }
}

module.exports.EnderecoRepository = new EnderecoRepository();