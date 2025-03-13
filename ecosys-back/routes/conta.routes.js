const { Router } = require('express');
const {ContaController} = require('../controller/conta.controller');
const router = Router();


router.post('/cadastrar', ContaController.verificaToken, ContaController.cadastrarUsuario);
router.get('/login',ContaController.login);
router.get('/usuarios', ContaController.getUsuarios); //TODO apagar
module.exports=router;