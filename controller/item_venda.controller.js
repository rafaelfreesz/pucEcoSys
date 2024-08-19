const {ItemVendaRepository} = require('../repository/item_venda.repository')
const {ProdutoController} = require('./produto.controller');

class ItemVendaController {

    async consultarTodos(request, response, next){
        try{
            const items_venda = await ItemVendaRepository.consultarTodos();
            
            for await(const item_venda of items_venda){
                const produto = await ProdutoController.getPorId(item_venda.fk_produto);
                if(produto) {item_venda.produto = produto}
                //TODO Implementar a lógica para receber a venda (se for o caso)
            }
            
            response.json(items_venda)
            
        }catch(e){
            console.log(e)
            e.erro=true;
            response.json(e);
        }
        
    };
       
    async consultarPorId(request, response, next){

        try{
            const item_venda = (await ItemVendaRepository.consultarPorId(request.params.id))[0];

            if(item_venda) {
                const produto = await ProdutoController.getPorId(item_venda.fk_produto);
                if(produto) {item_venda.produto = produto}
            }
            
            response.json(item_venda)

        }catch(e){
            console.log(e)
            e.erro=true;
            response.json(e);
        }
        
    };

    async consultarPorVenda(request, response, next){

        try{
            const items_venda = await ItemVendaRepository.consultarPorVenda(request.params.fk_venda);

            for await(const item_venda of items_venda){
                const produto = await ProdutoController.getPorId(item_venda.fk_produto);
                if(produto) {item_venda.produto = produto}
            }
            
            response.json(items_venda)

        }catch(e){
            console.log(e)
            e.erro=true;
            response.json(e);
        }
        
    };

    async incluir(request, response, next) {
        try{

            await ItemVendaRepository.incluir(request.body)
            response.redirect('/item_venda')

        }catch(e){
            console.log(e)
            e.erro=true;
            response.json(e)
        }
    
    };

    async alterar(request, response, next) {

        
        try{
            const id = request.params.id;
            const item_venda = request.body;
            await ItemVendaRepository.alterar(id,item_venda); 

            response.redirect('/item_venda')

        
        }catch(e){
            response.json(e)
        }

    }

    async excluirPorId(request, response, next) {

        try{
            await ItemVendaRepository.excluirPorId(request.params.id)
            response.redirect('/item_venda')
        }catch(e){
            response.json(e)
        }

    }

    // //Funções Auxiliares
    // async getPorEntrada(fk_entrada){
    //     try{
            
    //         const items_entrada = await ItemEntradaRepository.consultarPorEntrada(fk_entrada);
            
    //         for await(const item_entrada of items_entrada){
    //             const produto = await ProdutoController.getPorId(item_entrada.fk_produto);
    //             if(produto) {item_entrada.produto = produto}
    //             //TODO Implementar a lógica para receber a entrada (se for o caso)
    //         }
            
    //         return items_entrada
            
    //     }catch(e){
    //         console.log(e)
    //         e.erro=true;
    //     }
        
    // };

    
}

//Padrão Singleton
module.exports.ItemVendaController = new ItemVendaController();