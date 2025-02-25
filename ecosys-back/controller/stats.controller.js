const {StatsRepository} = require('../repository/stats.repository')

class StatsController {

    async consultarNotificacoes(request, response, next){
        try{
            
            const notificacoes = await StatsRepository.consultarNotificacoes();
            

            response.json(notificacoes)

            
        }catch(e){
            e.erro=true;
            response.json(e);
        }
        
    };

    async consultarResumoDiario(request, response, next){
        try{
            
            const produtosDiario = await StatsRepository.consultarProdutosVendidosDiario();
            const vendas_dia = await StatsRepository.consultarVendasDia();
            const soma_vendas_dia = await StatsRepository.consultarSomaValorVendasDia();

            response.json({
                vendas_dia: +vendas_dia[0].vendas_dia,
                valor_vendas_dia: +soma_vendas_dia[0].valor_total_vendido,
                media_por_venda: +soma_vendas_dia[0].valor_total_vendido/+vendas_dia[0].vendas_dia,
                produtos: produtosDiario
            })

            
        }catch(e){
            e.erro=true;
            response.json(e);
        }
        
    };


    
    
}

//Padrão Singleton
module.exports.StatsController = new StatsController();