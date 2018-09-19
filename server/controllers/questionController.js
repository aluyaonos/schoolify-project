const addQuestion = require('../models/Question')

//Every possible logic concerning course will be included here
module.exports = {
    //HTTP GET
    viewQuestion (req,res){
        addQuestion.find({}, function(error, questions){
            if (error)
                console.error(error);
            res.json(questions);
        }).sort({_id:-1}) //Sort displays the db content from current to oldest

        /*Also thesame as (difference, this displays the name of the Collection or Table)
        res.send({
                questions: questions
            })
        }).sort({_id:-1})
        */
    },

    //HTTP GET ... get a single Question
    singleQuestion (req,res){
        addQuestion.findById(req.params.questionid, function(error, question){
            if (error) {console.error(error);}
            res.send(question)
        })
    },

    //HTTP GET ... get all Questions unique to a course for generate paper
    singleQuestionByCourse (req,res){
        addQuestion.find({course: req.params.course}, function(error, question){
            if (error) {console.error(error);}
            res.send(question)
        })
    },

    //HTTP POST collecting the data posted
    addQuestion (req, res) {
        var db = req.db;

        //storing posted data into mongo using the schema defined
        var new_question = new addQuestion(req.body)

        //Exception handling
        new_question.save(function (error){
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
    updateQuestion (req,res){
        var db = req.db;
        addQuestion.findById(req.params.questionid, function(error, question){
            if (error) {
                console.error(error);
            }

            question.classLevel = req.body.classLevel,
            question.course = req.body.course,
            question.priority = req.body.priority,
            question.question = req.body.question,
            question.answer = req.body.answer

            question.save(function (error){
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
    deleteQuestion (req,res){
        var db = req.db;
        addQuestion.remove({_id: req.params.questionid}, function(error, studentquestion){
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