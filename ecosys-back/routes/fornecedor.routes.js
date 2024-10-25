const { Router } = require('express');
const {FornecedorController} = require('../controller/fornecedor.controller');
const router = Router();



router.get('/', FornecedorController.consultarTodos);
router.get('/:id', FornecedorController.consultarPorId);
router.post('/', FornecedorController.incluir)
router.put('/:id', FornecedorController.alterar);
router.delete('/:id',FornecedorController.excluirPorId)

module.exports=router;