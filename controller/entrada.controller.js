const {EntradaRepository} = require('../repository/entrada.repository')
const {FornecedorController} = require('./fornecedor.controller');

class EntradaController {

    async consultarTodos(request, response, next){
        try{
            
            const entradas = await EntradaRepository.consultarTodos();

            for await(const entrada of entradas){
                const fornecedor = await FornecedorController.getPorId(entrada.fk_fornecedor);
                if(fornecedor) {entrada.fornecedor = fornecedor}
            }
            
            response.json(entradas)
            
        }catch(e){
            console.log(e)
            e.erro=true;
            response.json(e);
        }
        
    };
    
    async consultarPorId(request, response, next){

        try{
            const entrada = (await EntradaRepository.consultarPorId(request.params.id))[0];

            if(entrada){
                const fornecedor = await FornecedorController.getPorId(entrada.fk_fornecedor);
                if(fornecedor) {entrada.fornecedor = fornecedor}
            }
            
            response.json(entrada)

        }catch(e){
            e.erro=true;
            response.json(e);
        }
        
    };

    // async consultarPorFornecedor(request, response, next){
    //     try{
    //         let contatos = (await ContatoRepository.consultarPorFornecedor(request.params['id_fornecedor']));
    //         response.json(contatos)

    //     }catch(e){
    //         e.erro=true;
    //         response.json(e);
    //     }
        
    // };

    // async incluir(request, response, next) {
    //     try{
    //         await ContatoRepository.incluir(request.body)
    //         response.redirect('/contatos')

    //     }catch(e){
    //         response.json(e)
    //     }
    
    // };

    // async alterar(request, response, next) {

        
    //     try{
    //         const id = request.params.id;
    //         const contato = request.body;
    //         await ContatoRepository.alterar(id,contato); 

    //         response.redirect('/contatos')

        
    //     }catch(e){
    //         response.json(e)
    //     }

    // }

    

    // async excluirPorId(request, response, next) {

    //     try{
    //         await ContatoRepository.excluirPorId(request.params.id)
    //         response.redirect('/contatos')
    //     }catch(e){
    //         response.json(e)
    //     }

    // }
}

//Padrão Singleton
module.exports.EntradaController = new EntradaController();