const {FornecedorRepository} = require('../repository/fornecedor.repository')
const {EnderecoRepository} = require('../repository/endereco.repository')

class FornecedorController {

    async consultarTodos(request, response, next){

        try{
            
            const fornecedores = await FornecedorRepository.consultarTodos();

            fornecedores.forEach((fornecedor,index) => {
    
                EnderecoRepository.consultarPorFornecedor(fornecedor.id)
                    .then(endereco => {
                        if(endereco[0]) { fornecedor.endereco = endereco[0]; };
                        if(index === fornecedores.length-1) { response.json(fornecedores) }
                    })
                    
            })

            
        }catch(e){
            e.erro=true;
            response.json(e);
        }
        
    };
    
    async consultarPorId(request, response, next){

        try{
            let fornecedor = (await FornecedorRepository.consultarPorId(request.params.id))[0];
            
            if(fornecedor){
                fornecedor.endereco = (await EnderecoRepository.consultarPorFornecedor(fornecedor.id))[0];
            }else{ fornecedor={}; }

            response.json(fornecedor)

        }catch(e){
            e.erro=true;
            response.json(e);
        }
        
    };

    incluir(request, response, next) {
        FornecedorRepository.incluir(request.body)
            .then(() => {response.redirect('/fornecedores')})
            .catch((erro) => {response.json(erro)})
    
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