var express  = require('express'),
    models   = require('./models'),
    puzzles  = require('./puzzles'),
    mongoose = require('mongoose'),
    settings = require('./settings');
    
var PORT = 3000;

var app = express.createServer();
app.configure(function(){
  app.use(express.static(__dirname + '/static'));
  app.set('views', __dirname + '/templates');
  app.set('view engine', 'jade');
});

// SETUP THE MODELS & DB
mongoose.connect(settings.MongoConnectUri);
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;
var AttemptSchema = new Schema({
  twitter_name: String,
  puzzle_slug:  String,
  question:  String, //JSON
  start_time: Date,
  end_time: Date,
  solved: Boolean,
	total_time: Number
});

mongoose.model('Attempt', AttemptSchema);
var Attempt = mongoose.model('Attempt');


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



// Alright, stuff that happens when this is requested.
// We ask for a question object.
// We serialize it and store it, with some meta info,
app.get('/play/puzzle/:puzzleslug/:twittername', function(req, res){
	var puzzle = puzzles[req.param('puzzleslug')];
	if(typeof(puzzle) == 'undefined'){  
		res.send({status: 'error', message: 'puzzle not found'}); 
	} else {
		var puzzle_question = puzzle.createQuestion();
		var new_attempt = new Attempt();
		new_attempt.question = JSON.stringify(puzzle_question);
		new_attempt.twitter_name = req.param('twittername'); 
		new_attempt.puzzle_slug = req.param('puzzleslug');
		new_attempt.start_time = Date.now();
		new_attempt.save(function(err){
			if(err){
				res.send({status: 'error', message: 'there was an error starting your puzzle attempt'});
			} else {
				res.send({status: 'ok', id: new_attempt._id ,puzzle: puzzle_question });
			}
		});
	}
});


app.post('/play/puzzle/:puzzleslug/:twittername', function(req, res){
  //Send post to question.
  //Wait for validated response.
  //Rock the casbah

	//Get the puzzle.
	//find the attempt
	//See if the twitter names match up.
	//Do the thing.
	var submit_time = Date.now();
	var puzzle = puzzles[req.param('puzzleslug')];
	if(typeof(puzzle) == 'undefined'){
		res.send({status: 'error', message: 'puzzle not found'});
	} else if(typeof(req.params('id')) == 'undefined') {  // They didn't post the puzzle
		res.send({status: 'error', message: 'you must provide your original puzzle ID in your JSON request'});	
	} else { // 
		Attempt.findById(req.params('id'), function(err,post){
			if(err){
				res.send({status: 'error', message: 'there was an error retrieving your attempt'});	
			} else {
				if(post.twitter_name !== req.params('twittername')){
					res.send({status:'error', message: 'the provided twittername didn\'t match the one originally provided'});
				} else {
					// Yay, we finally have an attempt object.
					if(post.solved === true){
						res.send({status: 'warning', message: 'you\'ve already successfully solved this puzzle attempt'});
					} else {
						var answer;
						try{
							answer = puzzle.validateAnswer(JSON.parse(post.question), req.param('answer'));
						} catch(e) {
							answer = false;
						}
						if(answer){
							post.end_time = submit_time;
							post.total_time = post.end_time - post.start_time;
							post.solved = true;
							post.save(function(err){
								if(err){
									res.send({status: 'error', message: 'error updating your attempt'});
								} else {
									res.send({status: 'ok', message: 'success! you solved this puzzle'})
								}
							});
						}else{
							res.send({status: 'error', message: 'that answer is incorrect'});
						}
					}
				}
			}
		});
	}
  res.send({status: 'ok'});
});


// Get Puzzle template for aggregate data.
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
      url: '/play/puzzle/' + puzzle +'/<your_twitter_name>',
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