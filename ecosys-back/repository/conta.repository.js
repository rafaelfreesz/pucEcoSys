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
    
    cadastrarUsuario(usuario){
        const sql = 'INSERT INTO tb_usuario(login, senha) VALUES ($1, $2) returning *';
        
        return executarQuery(sql,
            [
                usuario.login,
                usuario.senha
            ])
    }

    
}

module.exports.ContaRepository = new ContaRepository();