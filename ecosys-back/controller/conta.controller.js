const {ContaRepository} = require('../repository/conta.repository')
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
var config = require('../bin/config');
const { password } = require('../secrets/db_configurations');

class ContaController {

    verificaToken(request, response, next){
        const token = request.headers['x-access-token'];
        jwt.verify(token,config.secret,(erro,id) =>{
            if(erro) { return response.status(401).end();}
            
            next();
        })
    }

    async getUsuarios(request, response, next){

        const usuarios = await ContaRepository.getUsuarios();

        response.json(usuarios)
    }

    async cadastrarUsuario(request, response, next){
        var hashedPassword = bcrypt.hashSync(request.body.senha, 8);

        request.body.senha = hashedPassword
        const usuario = await ContaRepository.cadastrarUsuario(request.body);

        response.json(request.body)

    }

    async login(request,response,next){

        const usuario_request = {
            login: request.body.login,
            senha: request.body.senha
        }

        const usuario_banco = (await ContaRepository.getUsuario(usuario_request.login))[0]
        
        const passwordEhValido = await bcrypt.compare(usuario_request.senha,usuario_banco.senha)

        if(passwordEhValido){
            const token = jwt.sign({id: usuario_banco.id}, config.secret, {expiresIn: 3600})
            response.json({id: usuario_banco.id, login: usuario_banco.login, token: token, expira_em: 3600})
        }

        response.status(401).end()

    }
}

//Padrão Singleton
module.exports.ContaController = new ContaController();