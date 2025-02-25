const { Router } = require('express');
const {StatsController} = require('../controller/stats.controller');
const router = Router();



router.get('/notificacoes', StatsController.consultarNotificacoes);


module.exports=router;