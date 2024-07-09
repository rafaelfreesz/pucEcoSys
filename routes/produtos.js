const { Router } = require('express');
const pool = require('../db');

const router = Router();

router.get('/',(request, response, next) =>{
    pool.query('SELECT * FROM tb_produto ORDER BY id ASC',(err,res)=>{        
        if(err) return next(err);
        response.json(res.rows);
    })
})

router.get('/:id',(request, response, next) =>{
    pool.query('SELECT * FROM tb_produto WHERE id = $1',[request.params['id']],(err,res)=>{        
        if(err) return next(err);
        response.json(res.rows);
    })
})

module.exports=router;