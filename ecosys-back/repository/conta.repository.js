const {pool, executarQuery} = require('../db');

class ContaRepository{

    getUsuarios(){
        const sql = 'SELECT * FROM tb_usuario';
        
        return executarQuery(sql)
    }

    getUsuario(login){
        const sql = 'SELECT * FROM tb_usuario WHERE login = ($1)';
        
        return executarQuery(sql,
            [login]
        )
    }

    getUsuarioById(id){
        const sql = 'SELECT * FROM tb_usuario WHERE id = ($1)';
        
        return executarQuery(sql,
            [id]
        )
    }
    
    cadastrarUsuario(usuario){
        const sql = 'INSERT INTO tb_usuario(login, categoria, senha) VALUES ($1, $2, $3) returning *';
        
        return executarQuery(sql,
            [
                usuario.login,
                usuario.categoria,
                usuario.senha
            ])
    }

    async editarUsuario(id,usuario){

        const keys = ['login','senha','categoria']
        const fields = []

        keys.forEach(key => {
            if(usuario[key]) fields.push(key)
        })

        for(let i=0; i < fields.length; i++){
            const sql = `UPDATE tb_usuario SET ${fields[i]} = ($1) WHERE id = ($2)`;
    
            if(i === fields.length - 1){
                return executarQuery(sql,[usuario[fields[i]],id]);
            }else{
                await executarQuery(sql,[usuario[fields[i]],id]);
            }
        }
    }

    
}

module.exports.ContaRepository = new ContaRepository();