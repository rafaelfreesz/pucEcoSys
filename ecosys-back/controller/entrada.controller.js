const {EntradaRepository} = require('../repository/entrada.repository');
const { ItemEntradaRepository } = require('../repository/item_entrada.repository');
const { ProdutoRepository } = require('../repository/produto.repository');
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
            let entrada = request.body.entrada;
            entrada = (await EntradaRepository.incluir(entrada))[0]
            //Cadastrando items incluidos, se houver
            const novosItems = request.body.novos_items
            await novosItems.forEach(
                async itemNovo => {
                    itemNovo.fk_entrada = entrada.id
                    await ItemEntradaRepository.incluir(itemNovo);
                    let produto = (await ProdutoRepository.consultarPorId(itemNovo.fk_produto))[0]
                    produto.qtd_estoque+=itemNovo.quantidade
                    await ProdutoRepository.alterar(produto.id,produto)
                }
            )

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
                    let produto = (await ProdutoRepository.consultarPorId(itemNovo.fk_produto))[0]
                    produto.qtd_estoque+=itemNovo.quantidade
                    await ProdutoRepository.alterar(produto.id,produto)
                }
            )
            
            
            //Excluindo items, se houver
            const itemsPraExcluir = request.body.items_pra_excluir
            await itemsPraExcluir.forEach(
                async itemPraExcluir => {
                    await ItemEntradaRepository.excluirPorId(itemPraExcluir.id);
                    let produto = (await ProdutoRepository.consultarPorId(itemPraExcluir.produto.id))[0]
                    produto.qtd_estoque-=itemPraExcluir.quantidade
                    await ProdutoRepository.alterar(produto.id,produto)
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