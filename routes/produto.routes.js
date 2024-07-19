const { Router } = require('express');
const {ProdutoController} = require('../controller/produto.controller');

const router = Router();

router.get('/',ProdutoController.consultarTodosProdutos)

router.get('/:id',ProdutoController.consultarProdutoPorId)

router.post('/',ProdutoController.incluirProduto)

router.put('/:id',ProdutoController.alterarProduto)

router.delete('/:id',ProdutoController.excluirProdutoPorId)

module.exports=router;