const { Router } = require('express');
const {EntradaController} = require('../controller/entrada.controller');
const {ItemEntradaController} = require('../controller/item_entrada.controller');
const router = Router();

router.get('/', ItemEntradaController.consultarTodos);
router.get('/:id', ItemEntradaController.consultarPorId);
router.get('/:id', ItemEntradaController.consultarPorId);
router.get('/por_entrada/:fk_entrada', ItemEntradaController.consultarPorEntrada);
router.post('/', ItemEntradaController.incluir)
// router.put('/:id', ItemEntradaController.alterar);
// router.delete('/:id',ItemEntradaController.excluirPorId)

//TODO REMOVER ESSAS ROTAS (NÃO PRECISA DELAS)
module.exports=router;