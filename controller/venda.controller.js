const {ContatoRepository} = require('../repository/contato.repository')
const {FornecedorRepository} = require('../repository/fornecedor.repository')
const {VendaRepository} = require('../repository/venda.repository')

class VendaController {

    async consultarTodos(request, response, next){
        try{
            
            const vendas = await VendaRepository.consultarTodos();
            
            // TODO incluir items da venda

            response.json(vendas)

            
        }catch(e){
            e.erro=true;
            response.json(e);
        }
        
    };
    
    async consultarPorId(request, response, next){

        try{
            let venda = (await VendaRepository.consultarPorId(request.params.id))[0];
            
            // TODO incluir items da venda

            response.json(venda)

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
module.exports.VendaController = new VendaController();