const { Router } = require('express');
const {ContaController} = require('../controller/conta.controller');
const router = Router();


router.post('/cadastrarPrimeiro', ContaController.cadastrarPrimeiroUsuario);
router.post('/cadastrar', ContaController.verificaToken, ContaController.cadastrarUsuario);
router.put('/editar/:id', ContaController.verificaToken, ContaController.editarUsuario);
router.post('/login', ContaController.login);
router.get('/logout', ContaController.verificaToken,ContaController.logout);
router.get('/usuarios', ContaController.verificaToken, ContaController.getUsuarios); //TODO apagar
module.exports=router;