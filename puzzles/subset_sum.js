var assert = require('assert');

function makeArray(){
  var length = 15;
  var toreturn = [];
  for(var i=0; i<length; i++){ toreturn[i] = i }
  for(var i=0; i<length; i++){ 
    var toswap = Math.floor(Math.random()*(length-1));
    swap(toreturn, i, toswap)
    //randomly make some negative
    toreturn[i] *= (Math.floor(Math.random()*(2)) === 1)? -1 : 1; 
  }
  return toreturn;
  
  function swap(arr, a, b){
    var tmp = arr[a];
    arr[a] = arr[b];
    arr[b] = tmp;
  }
}


function subsetsum(vals, sum){
  var solution = [];
  combinations(vals).forEach(function(combo){
    var result = processCombination(combo,sum);
    if(result.foundit){
      if(solution.indexOf(result.set) === -1){
        if(result.set.length !== 0){
         solution.push(result.set);
        }
      }
      
    }
    return result;
  });
  return solution;

  function combinations(vals){
   var len = vals.length;
   var total = Math.pow(2,len);
   var toreturn = [];
   for(var i=0; i<total ; i++){
     var combination = [];
     for(var t=0; t<len; t++){
       if(Math.pow(2,t) & i){
         combination.push(vals[t]);
       }
     }
     toreturn.push(combination);
   }
   return toreturn;
  }

  function processCombination(combo, sum){
   var setsum = combo.reduce(function(item,acc){
     return item+acc;
   },0);
   var foundit = (sum === setsum);
   return {set: combo, sum: setsum, foundit: foundit};
  }
}


module.exports={
  name:'Subset Sum',
  description: 'From the given set, find all of the subsets that add up to zero',
  
  createQuestion:function(){
    return {
      set: makeArray(),
      solution_template: {id: '<id>', answer: [ [1,2,-3], [-4,-4,5,3], [-2,2] ]}
    }
  },

  validateAnswer:function(question,answer){
    if(question.hasOwnProperty('array_to_sort')){
      try{
        var valid_solution = subsetsum(question.set, 0);
        //TODO: sort all of the sets
        //TODO: find matches between the two arrays
        assert.deepEqual(valid_solution, answer);
        return true;
      }
      catch(e){ return false }
    }else{ return false }
  }
}

//test
var question = module.exports.createQuestion();
console.log(question);
var answer = subsetsum(question.set, 0);
console.log('Answer: ');
console.log(answer);
console.log(module.exports.validateAnswer(question, answer));

