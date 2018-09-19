var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var classSchema = new Schema({
    classLevel: String,
    studentNumber: Number,
    repName: String,
    email: String
});

var studentClass = mongoose.model('Class', classSchema);
module.exports = studentClass;