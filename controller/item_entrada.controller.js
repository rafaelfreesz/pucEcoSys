const {EntradaRepository} = require('../repository/entrada.repository')
const {ItemEntradaRepository} = require('../repository/item_entrada.repository')
const {ProdutoController} = require('./produto.controller');

class ItemEntradaController {

    async consultarTodos(request, response, next){
        try{
            
            const items_entrada = await ItemEntradaRepository.consultarTodos();
            
            for await(const item_entrada of items_entrada){
                const produto = await ProdutoController.getPorId(item_entrada.fk_produto);
                if(produto) {item_entrada.produto = produto}
                //TODO Implementar a lógica para receber a entrada (se for o caso)
            }
            
            response.json(items_entrada)
            
        }catch(e){
            console.log(e)
            e.erro=true;
            response.json(e);
        }
        
    };
       
    async consultarPorId(request, response, next){

        try{
            const item_entrada = (await ItemEntradaRepository.consultarPorId(request.params.id))[0];

            if(item_entrada) {
                const produto = await ProdutoController.getPorId(item_entrada.fk_produto);
                if(produto) {item_entrada.produto = produto}
            }
            
            response.json(item_entrada)

        }catch(e){
            console.log(e)
            e.erro=true;
            response.json(e);
        }
        
    };

    // async incluir(request, response, next) {
    //     try{
    //         await EntradaRepository.incluir(request.body)
    //         response.redirect('/entradas')

    //     }catch(e){
    //         console.log(e)
    //         e.erro=true;
    //         response.json(e)
    //     }
    
    // };

    // async alterar(request, response, next) {

        
    //     try{
    //         const id = request.params.id;
    //         const entrada = request.body;
    //         await EntradaRepository.alterar(id,entrada); 

    //         response.redirect('/entradas')

        
    //     }catch(e){
    //         response.json(e)
    //     }

    // }

    // async excluirPorId(request, response, next) {

    //     try{
    //         await EntradaRepository.excluirPorId(request.params.id)
    //         response.redirect('/entradas')
    //     }catch(e){
    //         response.json(e)
    //     }

    // }

    //Funções Auxiliares
    async getPorEntrada(fk_entrada){
        try{
            
            const items_entrada = await ItemEntradaRepository.consultarPorEntrada(fk_entrada);
            
            for await(const item_entrada of items_entrada){
                const produto = await ProdutoController.getPorId(item_entrada.fk_produto);
                if(produto) {item_entrada.produto = produto}
                //TODO Implementar a lógica para receber a entrada (se for o caso)
            }
            
            return items_entrada
            
        }catch(e){
            console.log(e)
            e.erro=true;
        }
        
    };

    
}

//Padrão Singleton
module.exports.ItemEntradaController = new ItemEntradaController();