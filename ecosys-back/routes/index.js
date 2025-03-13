const {Router} = require('express');
const produto = require('./produto.routes');
const fornecedor = require('./fornecedor.routes');
const contato = require('./contato.routes');
const entrada = require('./entrada.routes');
const item_entrada = require('./item_entrada.routes');
const venda = require('./venda.routes');
const item_venda = require('./item_venda.routes');
const stats = require('./stats.routes');
const conta = require('./conta.routes');

const router = Router();

router.use('/produtos',produto);
router.use('/fornecedores',fornecedor);
router.use('/contatos',contato);
router.use('/entradas',entrada);
router.use('/vendas',venda);
router.use('/item_entrada',item_entrada);
router.use('/item_venda',item_venda);
router.use('/stats',stats);
router.use('/conta',conta);

router.get('/', (request, response) =>{
    response.json()
    console.log("Hello World!")
})

module.exports = router;