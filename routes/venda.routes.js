const { Router } = require('express');
const {VendaController} = require('../controller/venda.controller');
const router = Router();



router.get('/', VendaController.consultarTodos);
router.get('/:id', VendaController.consultarPorId);
router.post('/', VendaController.incluir)
// router.put('/:id', ContatoController.alterar);
// router.delete('/:id',ContatoController.excluirPorId)

module.exports=router;