const express = require('express');
const bodyParser = require('body-parser')
const routes = require('./routes');
const cors = require('cors')


const app = express();

app.use(bodyParser.json({limit:'10mb'}));
app.use(cors())
app.use('/',routes)

app.use((err,req,res,next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.json(err);
})

module.exports=app;