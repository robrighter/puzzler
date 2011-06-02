var assert = require('assert');

function makeArray(){
  var length = 1000;
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
  msort(copy, 0, copy.length);
  return copy;
  
  function msort(array, begin, end){
    var size=end-begin;
    if(size<2){ return; }
    var begin_right=begin+Math.floor(size/2);
    msort(array, begin, begin_right);
    msort(array, begin_right, end);
    merge_inplace(array, begin, begin_right, end);
  }
  
  function merge_inplace(array, begin, begin_right, end){
    for(;begin<begin_right; ++begin) {
      if(array[begin]>array[begin_right]) {
        var v=array[begin];
        array[begin]=array[begin_right];
        insert(array, begin_right, end, v);
      }
    }
  }
  
  function swap(arr, a, b){
    var tmp = arr[a];
    arr[a] = b;
    arr[b] = tmp;
  }
  
  function insert(arr, begin, end, v){
    while(begin+1<end && arr[begin+1]<v) {
      swap(arr, begin, begin+1);
      ++begin;
    }
    arr[begin]=v;
  }
}

module.exports={
  name:'Array Sort',
  description: 'Sort the array in assending order.',
  
  createQuestion:function(){
    return {
      array_to_sort: makeArray(),
      solution_template: {id: '<id>', answer: [0,1,2,3,4,5,6,7,8,9,10]}
    }
  },

  validateAnswer:function(question,answer){
    if(question.hasOwnProperty('array_to_sort')){
      try{
        var valid_solution = sortArray(question.array_to_sort);
        assert.deepEqual(valid_solution, answer);
        return true;
      }
      catch(e){ return false }
    }else{ return false }
  }
}

//test
  // var question = module.exports.createQuestion();
  // var answer = sortArray(question.array_to_sort);
  // console.log(module.exports.validateAnswer(question, answer));

