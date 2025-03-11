const {pool, executarQuery} = require('../db');

class StatsRepository{

    consultarNotificacoes(){
        const sql = 'SELECT * FROM vw_estoque_baixo';
        return executarQuery(sql);
    }
    
    consultarProdutosVendidosDiario(){
        const sql = 'SELECT * from vw_produtos_vendidos_dia'
        return executarQuery(sql);
    }

    consultarVendasDia(){
        const sql = 'SELECT * from vw_conta_vendas_dia'
        return executarQuery(sql);
    }

    consultarSomaValorVendasDia(){
        const sql = 'SELECT * from vw_soma_valor_vendas_dia'
        return executarQuery(sql);
    }
    
    consultarValorVendaDia(dt_inicio,dt_fim){
        const sql = `SELECT * from vw_valor_vendido_por_data WHERE DATE(data_venda) >= '${dt_inicio}' AND DATE(data_venda) <= '${dt_fim}'`
        return executarQuery(sql);
    }

    
}

module.exports.StatsRepository = new StatsRepository();