const { Router } = require('express');
const {StatsController} = require('../controller/stats.controller');
const router = Router();



router.get('/notificacoes', StatsController.consultarNotificacoes);
router.get('/resumo_diario', StatsController.consultarResumoDiario);

module.exports=router;