const { Router } = require('express');
const {VendaController} = require('../controller/venda.controller');
const {ContaController} = require('../controller/conta.controller');
const router = Router();



router.get('/', ContaController.verificaToken, VendaController.consultarTodos);
router.get('/id/:id', ContaController.verificaToken, VendaController.consultarPorId);
router.get('/data/:data', ContaController.verificaToken, VendaController.consultarPorData);
router.post('/', ContaController.verificaToken, VendaController.incluir)
router.put('/:id', ContaController.verificaToken, VendaController.alterar);
router.delete('/:id', ContaController.verificaToken,VendaController.excluirPorId)

module.exports=router;