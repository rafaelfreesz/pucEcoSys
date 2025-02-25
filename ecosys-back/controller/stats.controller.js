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
    
    
}

//Padrão Singleton
module.exports.StatsController = new StatsController();