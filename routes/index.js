const {Router} = require('express');
const produtos = require('./produtos');
const fornecedores = require('./fornecedores');

const router = Router();

router.use('/produtos',produtos);
router.use('/fornecedores',fornecedores);

router.get('/', (request, response) =>{
    console.log("Hello World!")
})

module.exports = router;