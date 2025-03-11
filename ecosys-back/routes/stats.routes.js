const { Router } = require('express');
const {StatsController} = require('../controller/stats.controller');
const router = Router();



router.get('/notificacoes', StatsController.consultarNotificacoes);
router.get('/resumo_diario', StatsController.consultarResumoDiario);
router.get('/grafico/valor_venda_dia', StatsController.consultarValorVendaDia);

module.exports=router;