var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var courseSchema = new Schema({
    title: {type: String, unique: true},
    courseCode: {type: String, unique: true},
    classLevel: String,
    timesAweek: Number,
    contLecturers: Number,
    description: String
});

var course = mongoose.model('Course', courseSchema);
module.exports = course;