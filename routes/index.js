const {Router} = require('express');

const router = Router();

router.get('/', (request, response) =>{
    console.log("Hello World!")
})

module.exports = router;