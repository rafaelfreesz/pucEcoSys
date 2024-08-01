const {Router} = require('express');
const produto = require('./produto.routes');
const fornecedor = require('./fornecedor.routes');
const contato = require('./contato.routes');
const entrada = require('./entrada.routes');
const item_entrada = require('./item_entrada.routes');

const router = Router();

router.use('/produtos',produto);
router.use('/fornecedores',fornecedor);
router.use('/contatos',contato);
router.use('/entradas',entrada);
router.use('/item_entrada',item_entrada);

router.get('/', (request, response) =>{
    console.log("Hello World!")
})

module.exports = router;