var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var questionSchema = new Schema({
    classLevel: String,
    course: String,
    priority: String,
    question: String,
    answer1: String,
    answer2: String,
    answer3: String,
    answer4: String,
    answer: String
});

var questionBank = mongoose.model('Question', questionSchema);
module.exports = questionBank;