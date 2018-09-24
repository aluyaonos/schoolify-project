const addClass = require('../models/Class')

//Every possible logic concerning class will be included here
module.exports = {
    //HTTP GET
    viewClass (req,res){
        addClass.find({}, function(error, classes){
            if (error)
                console.error(error);
            res.json(classes);
        }).sort({_id:-1}) //Sort displays the db content from current to oldest

        /*Also thesame as (difference, this displays the name of the Collection or Table)
        res.send({
                classes: classes
            })
        }).sort({_id:-1})
        */
    },

    //HTTP GET ... get a single class
    singleClass (req,res){
        addClass.findById(req.params.classid, function(error, aclass){
            if (error) {console.error(error);}
            res.send(aclass)
        })
    },

    //HTTP POST collecting the data posted
    addClass (req, res) {
        var db = req.db;

        //storing posted data into mongo using the schema defined

        //Use this

        /* var classLevel = req.body.classLevel;
        var totalStudents = req.body.totalStudents;
        var course = req.body.course;
        var timesAweek = req.body.timesAweek; 
        var courseRep = req.body.courseRep;

        

        var new_class = new addClass({
            classLevel: classLevel,
            totalStudents: totalStudents,
            course: course,
            timesAweek: timesAweek,
            courseRep: courseRep
        }) */

        //Or this

        var new_class = new addClass(req.body)

        //Exception handling
        new_class.save(function (error){
            if(error){
                res.send({
                    success: false,
                    error: 'Please use a different name',
                    message: `Use a different name`
            })
                console.log(error)
            }
            res.send({
                success: true,
                message: `done...  registered `
            })
        })

    },

    //HTTP UPDATE
    updateClass (req,res){
        var db = req.db;
        addClass.findById(req.params.classid, function(error, studentclass){
            if (error) {
                console.error(error);
            }

            studentclass.classLevel = req.body.classLevel
            studentclass.studentNumber = req.body.studentNumber
            studentclass.repName = req.body.repName
            studentclass.email = req.body.email

            studentclass.save(function (error){
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
    deleteClass (req,res){
        var db = req.db;
        addClass.remove({_id: req.params.classid}, function(error, studentclass){
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