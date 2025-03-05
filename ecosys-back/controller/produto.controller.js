const {ProdutoRepository} = require('../repository/produto.repository')
const fs = require('fs');
const { Utils } = require('../utils/utils');

class ProdutoController {

    consultarTodos(request, response, next) {
        
        ProdutoRepository.consultarTodos()
            .then(retorno => {
                
                for(var produto of retorno){
                    const arquivo = fs.readFileSync(`uploads/img_produtos/img-prod-${produto.id}.jpg`);
                    const arquivoBase64 = arquivo.toString('base64');
                    produto.imagem = arquivoBase64;
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

    async incluir(request, response, next) {

        try{
            
            const k = await ProdutoRepository.incluir(request.body);
            response.json({})

        }catch(e){
            console.log(e)
            response.json(e)
        }

    }

    async alterar(request, response, next) {
        try{
            await ProdutoRepository.alterar(request.params.id,request.body)
            
            Utils.salvarImagem(request.body.imagem,request.params.id)

            response.json({})
        }catch(e){
            console.log(e)
            response.json(e)
        }
        
    }
    

    async excluirPorId(request, response, next) {
        try{
            const k = await ProdutoRepository.excluirPorId(request.params.id)
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