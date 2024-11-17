const {ContatoRepository} = require('../repository/contato.repository')
const {FornecedorRepository} = require('../repository/fornecedor.repository')

class ContatoController {

    async consultarTodos(request, response, next){
        try{
            
            const contatos = await ContatoRepository.consultarTodos();
            
            if(request.body['preenche_fornecedor']){
                contatos.forEach((contato,index) => {
                    FornecedorRepository.consultarPorId(contato.fk_fornecedor)
                    .then(fornecedor => {
                            if(fornecedor[0]) {  contato.fornecedor = fornecedor[0]; };
                            if(index === contatos.length-1) { response.json(contatos) }
                        })
                        
                })
            }else{
                response.json(contatos)
            }

            
        }catch(e){
            e.erro=true;
            response.json(e);
        }
        
    };
    
    async consultarPorId(request, response, next){

        try{
            let contato = (await ContatoRepository.consultarPorId(request.params.id))[0];
            if(contato && request.body['preenche_fornecedor']){
                contato.fornecedor= (await FornecedorRepository.consultarPorId(contato.fk_fornecedor))[0];
            }

            response.json(contato)

        }catch(e){
            e.erro=true;
            response.json(e);
        }
        
    };

    async consultarPorFornecedor(request, response, next){
        try{
            let contatos = (await ContatoRepository.consultarPorFornecedor(request.params['id_fornecedor']));
            response.json(contatos)

        }catch(e){
            e.erro=true;
            response.json(e);
        }
        
    };

    async incluir(request, response, next) {
        try{
            
            let body = {
                tipo: request.body.contato.tipo,
                valor: request.body.contato.valor,
                fk_fornecedor: request.body.fk_fornecedor
            }

            let ret = await ContatoRepository.incluir(body)
            response.json(ret)

        }catch(e){
            response.json(e)
        }
    
    };

    async alterar(request, response, next) {

        
        try{
            const id = request.params.id;
            const contato = request.body;
            await ContatoRepository.alterar(id,contato); 

            response.redirect('/contatos')

        
        }catch(e){
            response.json(e)
        }

    }

    

    async excluirPorId(request, response, next) {

        try{

            await ContatoRepository.excluirPorId(request.params.id)
            resp.json({'status': 'ok'})

        }catch(e){
            response.json(e)
        }

    }
}

//Padrão Singleton
module.exports.ContatoController = new ContatoController();