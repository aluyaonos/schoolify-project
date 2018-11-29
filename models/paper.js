var mongoose = require('mongoose');
var Schema = mongoose.Schema;
const questionSchema = Schema({
    questionid: Number,
    question: String,
    answer1: String,
    answer2: String,
    answer3: String,
    answer4: String,
    answer: String
})

var paperSchema = new Schema({
    name: String,
    questions: [questionSchema]
});

var questionPaper = mongoose.model('Paper', paperSchema);
module.exports = questionPaper;