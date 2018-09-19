var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var questionSchema = new Schema({
    classLevel: String,
    course: String,
    priority: String,
    question: String,
    answer: String
});

var questionBank = mongoose.model('Question', questionSchema);
module.exports = questionBank;