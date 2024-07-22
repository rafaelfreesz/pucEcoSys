const {FornecedorRepository} = require('../repository/fornecedor.repository')

class FornecedorController {

    consultarTodos(request, response, next){
        FornecedorRepository.consultarTodos()
            .then((retorno) => {response.json(retorno)})
            .catch((erro) => {response.json(erro)})

    };

    consultarPorId(request, response, next){
        FornecedorRepository.consultarPorId(request.params.id)
            .then((retorno) => {response.json(retorno)})
            .catch((erro) => {response.json(erro)})
    };

    incluir(request, response, next) {
        
    
    };

    alterar(request, response, next) {

        FornecedorRepository.alterar(request.params.id, request.body)
            .then(() => {response.redirect('/fornecedores')})
            .catch((erro) => {response.json(erro)})

    }

    excluirPorId(request, response, next) {
        FornecedorRepository.excluirPorId(request.params.id)
            .then(() => {response.redirect('/fornecedores')})
            .catch((erro) => {response.json(erro)})
    }
}

//Padrão Singleton
module.exports.FornecedorController = new FornecedorController();