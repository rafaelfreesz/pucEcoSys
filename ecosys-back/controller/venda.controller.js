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

    async incluir(request, response, next) {

        try{
            await VendaRepository.incluir(request.body)
            console.log(request.body)
            response.redirect('/vendas')

        }catch(e){
            response.json(e)
        }
    
    };

    async alterar(request, response, next) {

        
        try{
            const id = request.params.id;
            const venda = request.body;
            await VendaRepository.alterar(id,venda); 

            response.redirect('/vendas')

        
        }catch(e){
            response.json(e)
        }

    }

    async excluirPorId(request, response, next) {

        try{
            await VendaRepository.excluirPorId(request.params.id)
            response.redirect('/vendas')
        }catch(e){
            response.json(e)
        }

    }
}

//Padrão Singleton
module.exports.VendaController = new VendaController();