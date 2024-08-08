const {Router} = require('express');
const produto = require('./produto.routes');
const fornecedor = require('./fornecedor.routes');
const contato = require('./contato.routes');
const entrada = require('./entrada.routes');
const item_entrada = require('./item_entrada.routes');
const venda = require('./venda.routes');
const item_venda = require('./item_venda.routes');

const router = Router();

router.use('/produtos',produto);
router.use('/fornecedores',fornecedor);
router.use('/contatos',contato);
router.use('/entradas',entrada);
router.use('/vendas',venda);
router.use('/item_entrada',item_entrada);
router.use('/venda',item_venda);

router.get('/', (request, response) =>{
    console.log("Hello World!")
})

module.exports = router;