const addCourse = require('../models/Course')

//Every possible logic concerning course will be included here
module.exports = {
    //HTTP GET
    viewCourse (req,res){
        addCourse.find({}, function(error, courses){
            if (error)
                console.error(error);
            res.json(courses);
        }).sort({_id:-1}) //Sort displays the db content from current to oldest

        /*Also thesame as (difference, this displays the name of the Collection or Table)
        res.send({
                courses: courses
            })
        }).sort({_id:-1})
        */
    },

    //HTTP GET ... get a single course
    singleCourse (req,res){
        addCourse.findById(req.params.courseid, function(error, course){
            if (error) {console.error(error);}
            res.send(course)
        })
    },

    //HTTP POST collecting the data posted
    addCourse (req, res) {
        var db = req.db;

        //storing posted data into mongo using the schema defined

        //Use this

        /* var courseLevel = req.body.courseLevel;
        var totalStudents = req.body.totalStudents;
        var course = req.body.course;
        var timesAweek = req.body.timesAweek; 
        var courseRep = req.body.courseRep;

        

        var new_course = new addcourse({
            courseLevel: courseLevel,
            totalStudents: totalStudents,
            course: course,
            timesAweek: timesAweek,
            courseRep: courseRep
        }) */

        //Or this

        var new_course = new addCourse(req.body)

        //Exception handling
        new_course.save(function (error){
            if(error){
                console.log(error)
            }
            res.send({
                success: true,
                message: `done...  registered `
            })
        })

    },

    //HTTP UPDATE
    updateCourse (req,res){
        var db = req.db;
        addCourse.findById(req.params.courseid, function(error, course){
            if (error) {
                console.error(error);
            }
            course.title = req.body.title,
            course.courseCode = req.body.courseCode,
            course.classLevel = req.body.classLevel,
            course.timesAweek = req.body.timesAweek,
            course.contLecturers = req.body.contLecturers,
            course.description = req.body.description

            course.save(function (error){
                if(error){
                    console.log(error)
                }
                res.send({
                    success: true,
                    message: `done...  updated `
                })
            })
        })
    },

    //HTTP DELETE
    deleteCourse (req,res){
        var db = req.db;
        addCourse.remove({_id: req.params.courseid}, function(error, studentcourse){
            if (error) {
                res.send(error);
            }
            res.send({
                success: true,
                message: `done...  deleted `
            })
        })
    }
}