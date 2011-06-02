var fs = require('fs');

var puzzles = fs.readdirSync(__dirname).filter(function(i){ return i !== 'index.js' });


module.exports = puzzles.reduce(function(acc, i){
  var puzzle = require('./' + i);
  if(puzzle.hasOwnProperty('name')){
   acc[slugify(puzzle.name)] = puzzle;
  }
  return acc
},{})


function slugify(text) {
  text = text.replace(/[^-a-zA-Z0-9,&\s]+/ig, '');
  text = text.replace(/-/gi, "_");
  text = text.replace(/\s/gi, "-");
  return text.toLowerCase();
}

console.log('-----------------------------------------');
console.log('Found the following Puzzles:')
console.log(module.exports);
console.log('-----------------------------------------');