const {Router} = require('express');
const produto = require('./produto.routes');
const fornecedor = require('./fornecedor.routes');

const router = Router();

router.use('/produtos',produto);
router.use('/fornecedores',fornecedor);

router.get('/', (request, response) =>{
    console.log("Hello World!")
})

module.exports = router;