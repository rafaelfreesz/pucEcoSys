const {pool, executarQuery} = require('../db');

class StatsRepository{

    consultarNotificacoes(){
        const sql = 'SELECT * FROM vw_estoque_baixo';
        return executarQuery(sql);
    }

    
}

module.exports.StatsRepository = new StatsRepository();