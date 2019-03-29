'use strict'

const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const router = express.Router();
app.use('/', express.static(__dirname+'/'));

//middleare: irá rodar em todas as requisições
router.use((req, res, next) => {
    console.warn(req.method + " " + req.url + 
    " with " + JSON.stringify(req.body));
    next();
});

const positions = require('./positions_data')();

router.route('/positions/:data?')
.get((req, res) => {
    if (req.params.data) {
        let retorno = positions.filter((position) => {
            let posDate = new Date(position.dateTime);
            let StringDate = posDate.getFullYear() + '-' +  ('0' + (posDate.getMonth()+1)).slice(-2) + '-' + ('0' + (posDate.getDate())).slice(-2);            
            return StringDate == req.params.data;
        });
        if (retorno.length == 0){
            res.json("nenhum trajeto encontrado");
        } else {
            res.json(retorno);
        }        
    } else {
        res.json(positions);
    }    
});

app.use('/api', router);
const port = process.env.PORT || 8080;
app.listen(port);
console.log('Listen: ' + port);    