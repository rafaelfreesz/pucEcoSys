const { Router } = require('express');
const {VendaController} = require('../controller/venda.controller');
const router = Router();



router.get('/', VendaController.consultarTodos);
router.get('/id/:id', VendaController.consultarPorId);
router.get('/data/:data', VendaController.consultarPorData);
router.post('/', VendaController.incluir)
router.put('/:id', VendaController.alterar);
router.delete('/:id',VendaController.excluirPorId)

module.exports=router;