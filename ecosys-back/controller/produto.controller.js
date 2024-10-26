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

    incluir(request, response, next) {

        ProdutoRepository.incluir(request.body)
            .then(() => {response.redirect('/produtos')})
            .catch(erro => {response.json(erro)})

    }

    alterar(request, response, next) {

        ProdutoRepository.alterar(request.params.id,request.body)
            .then(() => response.redirect('/produtos'))
            .catch((erro) => {response.json(erro)})   
        
    }

    async getTodosProdutos(){
        return 
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