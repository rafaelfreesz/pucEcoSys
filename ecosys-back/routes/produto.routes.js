const { Router } = require('express');
const {ProdutoController} = require('../controller/produto.controller');

const router = Router();

//Rotas
router.get('/',ProdutoController.consultarTodos)
router.get('/:id',ProdutoController.consultarPorId)
router.post('/',ProdutoController.incluir)
router.put('/:id',ProdutoController.alterar)
router.delete('/:id',ProdutoController.excluirPorId)

module.exports=router;