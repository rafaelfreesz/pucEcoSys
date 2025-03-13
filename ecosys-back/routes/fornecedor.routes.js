const { Router } = require('express');
const {FornecedorController} = require('../controller/fornecedor.controller');
const {ContaController} = require('../controller/conta.controller');
const router = Router();



router.get('/', ContaController.verificaToken, FornecedorController.consultarTodos);
router.get('/:id', ContaController.verificaToken, FornecedorController.consultarPorId);
router.post('/', ContaController.verificaToken, FornecedorController.incluir)
router.put('/:id', ContaController.verificaToken, FornecedorController.alterar);
router.delete('/:id', ContaController.verificaToken,FornecedorController.excluirPorId)

module.exports=router;