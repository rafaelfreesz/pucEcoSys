const { Router } = require('express');
const {ItemVendaController} = require('../controller/item_venda.controller');
const {ContaController} = require('../controller/conta.controller');
const router = Router();

router.get('/', ContaController.verificaToken, ItemVendaController.consultarTodos);
router.get('/:id', ContaController.verificaToken, ItemVendaController.consultarPorId);
router.get('/por_venda/:fk_venda', ContaController.verificaToken, ItemVendaController.consultarPorVenda);
router.post('/', ContaController.verificaToken, ItemVendaController.incluir);
router.put('/:id', ContaController.verificaToken, ItemVendaController.alterar);
router.delete('/:id', ContaController.verificaToken,ItemVendaController.excluirPorId)

//TODO REMOVER ESSAS ROTAS (NÃO PRECISA DELAS)
module.exports=router;