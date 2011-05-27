function makeArray(){
  var length = 5000;
  var toreturn = [];
  for(var i=0; i<length; i++){
    toreturn[i] = Math.floor(Math.random()*(length*2));
  }
  return toreturn;
}

function sortArray(tosort){
  var copy = [];
  for(var i=0; i<tosort.length; i++){
    copy[i] = parseInt(tosort[i]);
  }
  return copy.sort(function(a,b){
    return parseInt(a) > parseInt(b);
  });
}

module.exports={
  name:'Array Sort',

  createQuestion:function(){
    return {
      array_to_sort: makeArray(),
      solution_template: [0,1,2,3,4,5,6,7,8,9,10]
    }
  },

  validateAnswer:function(question,answer){
    if(question.hasOwnProperty('array_to_sort')){
      try{
        assert.deepEqual(question.array_to_sort, sortArray(answer));
        return true;
      }
      catch(e){ return false }
    }else{ return false }
  }
}

//test
/*  var question = module.exports.createQuestion();
  console.log('Question is: ');
  console.log(question);
  
  var answer = sortArray(question.array_to_sort);
  console.log(answer);
  console.log(module.exports.validateAnswer(question, answer));
*/
