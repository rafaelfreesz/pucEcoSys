const { Router } = require('express');
const {EntradaController} = require('../controller/entrada.controller');
const {ContaController} = require('../controller/conta.controller');
const router = Router();

router.get('/', ContaController.verificaToken, EntradaController.consultarTodos);
router.get('/:id', ContaController.verificaToken, EntradaController.consultarPorId);
router.post('/', ContaController.verificaToken, EntradaController.incluir)
router.put('/:id', ContaController.verificaToken, EntradaController.alterar);
router.delete('/:id', ContaController.verificaToken,EntradaController.excluirPorId)

module.exports=router;