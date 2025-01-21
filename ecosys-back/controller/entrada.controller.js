const {EntradaRepository} = require('../repository/entrada.repository');
const { ItemEntradaRepository } = require('../repository/item_entrada.repository');
const {FornecedorController} = require('./fornecedor.controller');
const {ItemEntradaController} = require('./item_entrada.controller');

class EntradaController {

    async consultarTodos(request, response, next){
        try{
            
            const entradas = await EntradaRepository.consultarTodos();

            for await(const entrada of entradas){
                const fornecedor = await FornecedorController.getPorId(entrada.fk_fornecedor);
                const items = await ItemEntradaController.getPorEntrada(entrada.id);

                if(fornecedor) {entrada.fornecedor = fornecedor}
                if(items) {entrada.items = items}
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
            console.log(e)
            e.erro=true;
            response.json(e);
        }
        
    };

    async incluir(request, response, next) {
        try{
            await EntradaRepository.incluir(request.body)
            response.redirect('/entradas')

        }catch(e){
            console.log(e)
            e.erro=true;
            response.json(e)
        }
    
    };

    async alterar(request, response, next) {

        
        try{
            const id = request.params.id;

            //Alterando dados gerais da Entrada
            const entrada = request.body.entrada;
            await EntradaRepository.alterar(id,entrada); 
            
            //Cadastrando items incluidos, se houver
            const novosItems = request.body.novos_items
            await novosItems.forEach(
                async itemNovo => {
                    await ItemEntradaRepository.incluir(itemNovo);
                }
            )
            
            
            //Excluindo items, se houver
            const idsItemsPraExcluir = request.body.ids_items_pra_excluir
            await idsItemsPraExcluir.forEach(
                async elemento => {
                    await ItemEntradaRepository.excluirPorId(elemento);
                })

            //Retornando a lista de todas as entradas atualizada
            const entradas = await EntradaRepository.consultarTodos();

            for await(const entrada of entradas){
                const fornecedor = await FornecedorController.getPorId(entrada.fk_fornecedor);
                const items = await ItemEntradaController.getPorEntrada(entrada.id);

                if(fornecedor) {entrada.fornecedor = fornecedor}
                if(items) {entrada.items = items}
            }
            
            response.json(entradas)
        
        }catch(e){
            response.json(e)
        }

    }

    async excluirPorId(request, response, next) {

        try{
            await EntradaRepository.excluirPorId(request.params.id)

            const entradas = await EntradaRepository.consultarTodos();

            for await(const entrada of entradas){
                const fornecedor = await FornecedorController.getPorId(entrada.fk_fornecedor);
                const items = await ItemEntradaController.getPorEntrada(entrada.id);

                if(fornecedor) {entrada.fornecedor = fornecedor}
                if(items) {entrada.items = items}
            }
            
            response.json(entradas)
        }catch(e){
            response.json(e)
        }

    }

    
}

//Padrão Singleton
module.exports.EntradaController = new EntradaController();