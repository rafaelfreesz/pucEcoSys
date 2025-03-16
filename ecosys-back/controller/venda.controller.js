const {ItemVendaController} = require('../controller/item_venda.controller')
const {ItemVendaRepository} = require('../repository/item_venda.repository')
const {VendaRepository} = require('../repository/venda.repository')
const {ProdutoRepository} = require('../repository/produto.repository')

class VendaController {

    async consultarTodos(request, response, next){
        try{
            
            const vendas = await VendaRepository.consultarTodos();
            
            for await(const venda of vendas){
                const items = await ItemVendaController.getPorVenda(venda.id)
                if(items){venda.items = items}
            }

            response.json(vendas)

            
        }catch(e){
            e.erro=true;
            response.json(e);
        }
        
    };

    async consultarPorData(request, response, next){
        try{
            const vendas = await VendaRepository.consultarPorData(request.params.data);
            
            for await(const venda of vendas){
                const items = await ItemVendaController.getPorVenda(venda.id)
                if(items){venda.items = items}
            }

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
            let venda = (await VendaRepository.incluir(request.body.venda))[0];
            console.log(venda)
            await request.body.items.forEach(
                async itemNovo => {
                    itemNovo.fk_venda = venda.id;
                    let ventinha = await ItemVendaRepository.incluir(itemNovo);
                    
                    //Abatendo estoque
                    let produto = (await ProdutoRepository.consultarPorId(itemNovo.fk_produto))[0]
                    produto.qtd_estoque-=itemNovo.quantidade
                    await ProdutoRepository.alterar(produto.id,produto)
                }
            ) 

            response.json({status: 'ok'})

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