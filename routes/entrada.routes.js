const { Router } = require('express');
const {EntradaController} = require('../controller/entrada.controller');
const router = Router();

router.get('/', EntradaController.consultarTodos);
router.get('/:id', EntradaController.consultarPorId);
// router.post('/', EntradaController.incluir)
// router.put('/:id', EntradaController.alterar);
// router.delete('/:id',EntradaController.excluirPorId)

module.exports=router;