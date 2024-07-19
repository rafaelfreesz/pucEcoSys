const {Router} = require('express');
const produto = require('./produto.routes');
const fornecedores = require('./fornecedores');

const router = Router();

router.use('/produtos',produto);
router.use('/fornecedores',fornecedores);

router.get('/', (request, response) =>{
    console.log("Hello World!")
})

module.exports = router;