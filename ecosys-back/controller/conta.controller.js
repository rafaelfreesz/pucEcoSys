const {ContaRepository} = require('../repository/conta.repository')
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
var config = require('../bin/config');
const { password } = require('../secrets/db_configurations');
class ContaController {


    verificaToken(request, response, next){

        const token = request.headers['x-access-token'];

        jwt.verify(token,config.secret,(erro,id) =>{
            if(erro) { return response.status(401).send({erro: "Token inválido"});}      
            next();
        })
    }

    async getUsuarios(request, response, next){
        const usuarios = await ContaRepository.getUsuarios();
        response.json(usuarios)
    }

    async cadastrarUsuario(request, response, next){

        try{

            if(!request.body.login){
                throw new Error("Login não informado")
            }
            if(!request.body.categoria){
                throw new Error("Categoria não informada")
            }
            if(!request.body.senha){
                throw new Error("Senha não informada")
            }
            
            var hashedPassword = bcrypt.hashSync(request.body.senha, 8);
            request.body.senha = hashedPassword
            const usuario = await ContaRepository.cadastrarUsuario(request.body);
    
            response.json({status: 'ok'})

        }catch(e) {
            
            response.status(401).send({nome: e.name, erro: e.message})
        }
        
    }

    async cadastrarPrimeiroUsuario(request, response, next){

        try{

            const usuarios = await ContaRepository.getUsuarios();

            if(usuarios.length > 0){
                throw new Error("Ja existe usuario cadastrado")
            }

            if(!request.body.login){
                throw new Error("Login não informado")
            }
            if(!request.body.categoria){
                throw new Error("Categoria não informada")
            }
            if(!request.body.senha){
                throw new Error("Senha não informada")
            }
            
            var hashedPassword = bcrypt.hashSync(request.body.senha, 8);
            request.body.senha = hashedPassword
            const usuario = await ContaRepository.cadastrarUsuario(request.body);
    
            response.json({status: 'ok'})

        }catch(e) {
            
            response.status(401).send({nome: e.name, erro: e.message})
        }
        
    }

    async login(request,response,next){

        try{
            if(!request.body.login){
                throw new Error("Login não informado")
            }
            if(!request.body.senha){
                throw new Error("Senha não informada")
            }

            const usuario_request = {
                login: request.body.login,
                senha: request.body.senha
            }

            const usuario_banco = (await ContaRepository.getUsuario(usuario_request.login))[0]
            
            if(!usuario_banco){
                throw new Error("Usuario nao existe")
            }
            const passwordEhValido = await bcrypt.compare(usuario_request.senha,usuario_banco.senha)
            
            if(passwordEhValido){
            
                const token = jwt.sign({id: usuario_banco.id}, config.secret, {expiresIn: 3600})
                response.json({id: usuario_banco.id, login: usuario_banco.login, categoria: usuario_banco.categoria, token: token, expira_em: 3600})
            
            }else{
                throw new Error("Senha incorreta")
            }
        }catch(e){

            response.status(401).send({nome: e.name, mensagem: e.message})
        }

    }

    async logout(request,response,next){
        response.end();
    }
}

//Padrão Singleton
module.exports.ContaController = new ContaController();