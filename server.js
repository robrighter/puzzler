var express  = require('express'),
    mongoose = require('mongoose');
    
    
var app = express.createServer();

app.get('/', function(request, response){
  response.send('Hello World');
});

app.listen(3000);