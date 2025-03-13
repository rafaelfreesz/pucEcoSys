const { Router } = require('express');
const {ProdutoController} = require('../controller/produto.controller');
const {ContaController} = require('../controller/conta.controller');

const router = Router();

//Rotas
router.get('/', ContaController.verificaToken,ProdutoController.consultarTodos)
router.get('/:id', ContaController.verificaToken,ProdutoController.consultarPorId)
router.get('/id/proximo', ContaController.verificaToken,ProdutoController.consultarProximoId)
router.post('/',ProdutoController.incluir)
router.put('/:id', ContaController.verificaToken,ProdutoController.alterar)
router.delete('/:id', ContaController.verificaToken,ProdutoController.excluirPorId)

module.exports=router;