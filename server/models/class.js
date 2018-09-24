var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var classSchema = new Schema({
    classLevel: {
      type: String,
      unique: true
    },
    studentNumber: Number,
    repName: String,
    email: String
});

var studentClass = mongoose.model('Class', classSchema);
module.exports = studentClass;