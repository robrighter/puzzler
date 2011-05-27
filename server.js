var express  = require('express'),
    mongoose = require('mongoose');
    
    
var app = express.createServer();

app.configure(function(){
  app.use(express.static(__dirname + '/public'));
  app.set('views', __dirname + '/templates');
  app.set('view engine', 'jade');
});

app.get('/', function(request, response){
  response.render('index');
});

app.listen(3000);