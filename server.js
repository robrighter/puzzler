var express  = require('express'),
    models   = require('./models'),
    puzzles  = require('./puzzles'),
    mongoose = require('mongoose'),
    settings = require('./settings');
    
var PORT = 3000;

var app = express.createServer();
app.configure(function(){
  app.use(express.static(__dirname + '/public'));
  app.set('views', __dirname + '/templates');
  app.set('view engine', 'jade');
});

// SETUP THE MODELS & DB
mongoose.connect(settings.MongoConnectUri);
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;
var Attempt = new Schema({
  twitter_name: String,
  puzzle_slug:  String,
  question:  String, //JSON
  start_time: Number,
  end_time: Number,
  solved: Boolean
});


// None of this stuff is very useful yet, 
// but as the general idea gets fleshed out
// this stuff will move to more useful places.

// Routes needed.
// Home route that aggregates all the puzzles and data
// Play route that returns information about all the puzzles
// Individual routes for each puzzle
//    A /puzzle/:id/ route that has aggregate information
//      regarding players and totals.
//    A /puzzle/:id/play route that is an API endpoint.
//      Depending on the question, this may also accept
//      an additional /puzzle/:id/play/:key/ that would
//      specify a particular position in a given puzzle

app.get('/play/puzzle/:puzzleslug', function(req, res){
  res.send({status: 'ok', puzzle: req.params.id});
});

app.post('/play/puzzle/:puzzleslug', function(req, res){
  //Send post to question.
  //Wait for validated response.
  //Rock the casbah
  res.send({status: 'ok'});
});

app.get('/puzzle/:puzzleslug', function(req, res){
  res.send({status: 'ok'});
});

app.get('/play', function(req, res){
  // Get the list of puzzles, return an object that looks nice
  // and explains how to handle things.
  var counter = 0;
  var result = {};
  for(puzzle in puzzles){
    counter++;
    result["puzzle" + counter] = {
      url: '/play/puzzle/' + slugify(puzzles[puzzle].name),
      name: puzzles[puzzle].name,
      description: puzzles[puzzle].description
    };
  }
  res.send(result);
});

app.get('/', function(req, res){
  res.render('index');
});

app.listen(PORT);
console.log("Puzzler is ready for connections on port " + PORT);

///////////////////////////////////////////////////////////////////
// UTILS
function slugify(text) {
  text = text.replace(/[^-a-zA-Z0-9,&\s]+/ig, '');
  text = text.replace(/-/gi, "_");
  text = text.replace(/\s/gi, "-");
  return text.toLowerCase();
}