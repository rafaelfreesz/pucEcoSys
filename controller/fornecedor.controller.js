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

    async incluir(request, response, next) {
        try{
            
            const fornecedor = await FornecedorRepository.incluir(request.body)
            
            //Persistindo endereço
            if(request.body.endereco){
                const endereco = request.body.endereco;
                endereco.fk_fornecedor = fornecedor[0].id;
                await EnderecoRepository.incluir(endereco);
            }

            response.redirect('/fornecedores')

            
        }catch(e){
            response.json(e)
        }
    
    };

    async alterar(request, response, next) {

        
        try{
            const id = request.params.id;
            const fornecedor = request.body;

            await FornecedorRepository.alterar(id,fornecedor); 
            
            if(fornecedor['endereco']){
                await EnderecoRepository.alterar(id, fornecedor['endereco'])
            }

            response.redirect('/fornecedores')

        
        }catch(e){
            response.json(e)
        }

    }

    async excluirPorId(request, response, next) {

        try{
            await FornecedorRepository.excluirPorId(request.params.id)
            response.redirect('/fornecedores')
        }catch(e){
            response.json(e)
        }

    }
}

//Padrão Singleton
module.exports.FornecedorController = new FornecedorController();