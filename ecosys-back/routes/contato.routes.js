const { Router } = require('express');
const {ContatoController} = require('../controller/contato.controller');
const {ContaController} = require('../controller/conta.controller');
const router = Router();



router.get('/', ContaController.verificaToken, ContatoController.consultarTodos);
router.get('/:id', ContaController.verificaToken, ContatoController.consultarPorId);
router.get('/fornecedor/:id_fornecedor', ContatoController.consultarPorFornecedor);
router.post('/', ContaController.verificaToken, ContatoController.incluir)
router.put('/:id', ContaController.verificaToken, ContatoController.alterar);
router.delete('/:id', ContaController.verificaToken,ContatoController.excluirPorId)

module.exports=router;