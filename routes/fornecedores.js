const { Router } = require('express');
const pool = require('../db');

const router = Router();

const getEnderecoFornecedor = (fornecedor) => {
    
    

}

router.get('/', (request, response, next) =>{
    // pool.query('SELECT * FROM tb_fornecedor JOIN tb_endereco ON tb_endereco.fk_fornecedor = tb_fornecedor.id',(err,res)=>{        
    pool.query('SELECT * FROM tb_fornecedor',(err,res)=>{        
        if(err) return next(err);
        
        res.rows.forEach((ro,index) => {
            pool.query('SELECT * FROM tb_endereco WHERE fk_fornecedor = $1', [ro.id], (err,rores) => {
                if(err || rores.rows.length>1) return next(err);
                
                ro['endereco']=rores.rows[0];
                
                if(index === res.rows.length-1)   response.json(res.rows);
            })
        })

        
        // response.json(res.rows);
    })
    //TODO trazer tambem o endereço
})

router.get('/:id',(request, response, next) =>{
    pool.query('SELECT * FROM tb_fornecedor WHERE id = $1',[request.params['id']],(err,res)=>{        
        if(err) return next(err);
        response.json(res.rows);
    })
})

router.post('/',(request, response, next) =>{


    const {cnpj, razao_social, nome_empresarial} = request.body;

    pool.query('INSERT INTO tb_fornecedor(cnpj, razao_social, nome_empresarial) VALUES ($1,$2,$3)',
        [cnpj, razao_social, nome_empresarial],
        (err,res)=>{
            if(err) return next(err);

            response.redirect('/fornecedores');
        }
    );
})

router.put('/:id',(request, response, next) =>{

    const {id} = request.params;

    const keys = ['cnpj', 'razao_social', 'nome_empresarial'];

    const fields = [];

    keys.forEach(key => {
        if(request.body[key]) fields.push(key);
    })

    fields.forEach((field,index) => {
        
        pool.query(`UPDATE tb_fornecedor SET ${field} = ($1) WHERE id = ($2)`,
            [request.body[field], id],
            (err,res)=>{
                if(err) return next(err);
    
                if(index === fields.length - 1) response.redirect('/fornecedores');
            }
        );
        
    })
})

router.delete('/:id',(request, response, next) =>{
    pool.query('DELETE FROM tb_fornecedor WHERE id = $1',[request.params['id']],(err,res)=>{
        if(err) return next(err);
        response.redirect('/fornecedores');
    })
})

module.exports=router;