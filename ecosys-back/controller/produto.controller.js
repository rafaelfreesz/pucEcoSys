const {ProdutoRepository} = require('../repository/produto.repository')

class ProdutoController {

    consultarTodos(request, response, next) {

        ProdutoRepository.consultarTodos()
            .then(retorno => {response.json(retorno)})
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
            const k = await ProdutoRepository.alterar(request.params.id,request.body)
            const produtos = await ProdutoRepository.consultarTodos()
            response.json(produtos)
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