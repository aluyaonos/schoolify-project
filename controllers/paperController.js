const addPaper = require('../models/Paper')

//Every possible logic concerning the question paper will be included here
module.exports = {
    //HTTP GET
    viewPaper (req,res){
        addPaper.find({}, function(error, papers){
            if (error)
                console.error(error);
            res.json(papers);
        }).sort({_id:-1}) //Sort displays the db content from current to oldest

        /*Also thesame as (difference, this displays the name of the Collection or Table)
        res.send({
                questions: questions
            })
        }).sort({_id:-1})
        */
    },

    //HTTP GET ... get a single Question Paper
    singlePaper (req,res){
        addPaper.findById(req.params.paperid, function(error, paper){
            if (error) {console.error(error);}
            res.send(paper)
        })
    },

    /* HTTP GET ... get all Questions Paper 
    singleQuestionByCourse (req,res){
        addQuestion.find({course: req.params.course}, function(error, question){
            if (error) {console.error(error);}
            res.send(question)
        })
    }, */

    //HTTP POST collecting the data posted
    addPaper (req, res) {
        var db = req.db;

        //storing posted data into mongo using the schema defined
        var new_paper = new addPaper(req.body)

        //Exception handling
        new_paper.save(function (error){
            if(error){
                console.log(error)
            }
            res.send({
                success: true,
                message: `done...  registered `
            })
        })

    },

    //HTTP DELETE
    deletePaper (req,res){
        var db = req.db;
        addPaper.remove({_id: req.params.paperid}, function(error, exampaper){
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