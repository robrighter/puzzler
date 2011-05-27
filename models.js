/* Puzzler Models */

/*  Contains question input data, timestamps
    for start and successful completion,
    and a unique ID that a user must
    reference when talking about this question.
    We also reference the user, to prevent
    griefing.
*/
var mongoose = require('mongoose');

var Schema   = mongoose.Schema;
var ObjectId = Schema.ObjectId;

var QuestionSchema = new Schema({
  start_time:    Date,
  submit_time:   Date,
  user:          ObjectId
});

/*  References a user (authed via Twitter) to
    their API key. You know, to prevent screwing
    around with other people.
*/
var UserSchema = new Schema({
  twitter_name:  String,
  access_token:  String,
  access_key:    String,
  api_key:       String 
});

mongoose.model('Question', QuestionSchema);
mongoose.model('User', UserSchema);

module.exports = {
  Question: mongoose.model('Question'),
  User: mongoose.model('User')
}