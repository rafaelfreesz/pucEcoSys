const {Router} = require('express');
const produtos = require('./produtos');

const router = Router();

router.use('/produtos',produtos);

router.get('/', (request, response) =>{
    console.log("Hello World!")
})

module.exports = router;