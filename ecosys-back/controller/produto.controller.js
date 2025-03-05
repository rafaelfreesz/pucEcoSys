const {ProdutoRepository} = require('../repository/produto.repository')
const fs = require('fs');
const { Utils } = require('../utils/utils');

class ProdutoController {

    consultarTodos(request, response, next) {
        
        ProdutoRepository.consultarTodos()
            .then(retorno => {
                
                for(var produto of retorno){
                    Utils.serializarImagem(produto)
                }

                response.json(retorno)
            })
            .catch(erro => {response.json(erro)})
            //Todo implementar lógica que traz as entradas

    }

    consultarPorId(request, response, next) {

        ProdutoRepository.consultarPorId(request.params.id)
            .then(retorno => {response.json(retorno)})
            .catch(erro => {response.json(erro)})
            //Todo implementar lógica que traz as entradas

    }

    consultarProximoId(request, response, next){
        
        ProdutoRepository.consultarProximoId()
            .then(retorno => {response.json(retorno)})
            .catch(erro => {response.json(erro)})

    }

    async incluir(request, response, next) {

        try{
            
            const id = (await ProdutoRepository.incluir(request.body))[0].id;
            
            if(request.body.imagem){
                Utils.salvarImagem(request.body.imagem,id)
            }

            response.json({})

        }catch(e){
            console.log(e)
            response.json(e)
        }

    }

    async alterar(request, response, next) {
        try{
            await ProdutoRepository.alterar(request.params.id,request.body)
            
            if(request.body.imagem){
                Utils.salvarImagem(request.body.imagem,request.params.id)
            }

            response.json({})
        }catch(e){
            console.log(e)
            response.json(e)
        }
        
    }
    

    async excluirPorId(request, response, next) {
        try{
            await ProdutoRepository.excluirPorId(request.params.id)

            Utils.excluirImagem(request.params.id)

            const produtos = await ProdutoRepository.consultarTodos()
            response.json(produtos)

        }catch(e){
            console.log(e)
            response.json(e)
        }
        
    }

    //Funções Auxiliares
    async getPorId(id) {

        const produto = (await ProdutoRepository.consultarPorId(id))[0]
       
        return produto
    }

}

//Padrão Singleton
module.exports.ProdutoController = new ProdutoController()