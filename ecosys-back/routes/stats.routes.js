const { Router } = require('express');
const {StatsController} = require('../controller/stats.controller');
const {ContaController} = require('../controller/conta.controller');
const router = Router();



router.get('/notificacoes', ContaController.verificaToken, StatsController.consultarNotificacoes);
router.get('/resumo_diario', ContaController.verificaToken, StatsController.consultarResumoDiario);
router.get('/grafico/valor_venda_dia', ContaController.verificaToken, StatsController.consultarValorVendaDia);

module.exports=router;