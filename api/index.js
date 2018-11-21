var express = require('express');
var cors = require('cors');
var app = express();
var myFunction = require('./myFunction');

app.use(cors());

app.get('/points', function (req, resp) {
    resp.json(myFunction.points());
});

app.get('/posicoes/:data', function(req, resp){
    let data = req.params.data;
    resp.json(myFunction.posicoes(data));
});

app.listen(7000, function () {
    console.log('Example app listening on port 7000');
});
