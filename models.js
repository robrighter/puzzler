/* Puzzler Models */

/*  Contains question input data, timestamps
    for start and successful completion,
    and a unique ID that a user must
    reference when talking about this question.
    We also reference the user, to prevent
    griefing.
*/

var ObjectId = Schema.ObjectId;

var Question = new Schema({
  data:          Object,
  start_time:    Date,
  submit_time:   Date,
  user:          ObjectId
});

/*  References a user (authed via Twitter) to
    their API key. You know, to prevent screwing
    around with other people.
*/
var User = new Schema({
  twitter_name:  String,
  access_token:  String,
  access_key:    String,
  api_key:       String 
});