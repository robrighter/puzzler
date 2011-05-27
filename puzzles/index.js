var fs = require('fs');

var puzzles = fs.readdirSync('./').filter(function(i){ return i !== 'index.js' });


module.exports = puzzles.reduce(function(acc, i){
  var puzzle = require('./' + i);
  if(puzzle.hasOwnProperty('name')){
   acc[puzzle.name] = puzzle;
  }
  return acc
},{})

console.log('-----------------------------------------');
console.log('Found the following Puzzles:')
console.log(module.exports);
console.log('-----------------------------------------');