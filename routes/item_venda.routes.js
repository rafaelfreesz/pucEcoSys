const { Router } = require('express');
const {ItemVendaController} = require('../controller/item_venda.controller');
const router = Router();

router.get('/', ItemVendaController.consultarTodos);
router.get('/:id', ItemVendaController.consultarPorId);
router.get('/por_venda/:fk_venda', ItemVendaController.consultarPorVenda);
// router.post('/', ItemVendaController.incluir)
// router.put('/:id', ItemVendaController.alterar);
// router.delete('/:id',ItemVendaController.excluirPorId)

//TODO REMOVER ESSAS ROTAS (NÃO PRECISA DELAS)
module.exports=router;