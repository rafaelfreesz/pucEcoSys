const { Router } = require('express');
const {ItemEntradaController} = require('../controller/item_entrada.controller');
const {ContaController} = require('../controller/conta.controller');
const router = Router();

router.get('/', ContaController.verificaToken, ItemEntradaController.consultarTodos);
router.get('/:id', ContaController.verificaToken, ItemEntradaController.consultarPorId);
router.get('/:id', ContaController.verificaToken, ItemEntradaController.consultarPorId);
router.get('/por_entrada/:fk_entrada', ContaController.verificaToken, ItemEntradaController.consultarPorEntrada);
router.post('/', ContaController.verificaToken, ItemEntradaController.incluir)
router.put('/:id', ContaController.verificaToken, ItemEntradaController.alterar);
router.delete('/:id', ContaController.verificaToken,ItemEntradaController.excluirPorId)

//TODO REMOVER ESSAS ROTAS (NÃO PRECISA DELAS)
module.exports=router;