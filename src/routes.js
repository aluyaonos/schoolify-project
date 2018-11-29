//Including the controller function to the routes
const ClassController = require('../controllers/classController')
const CourseController = require('../controllers/courseController')
const QuestionController = require('../controllers/questionController')
const PaperController = require('../controllers/paperController')

module.exports = (app) => {

    //Routes for Class
    app.get('/viewclass',
        ClassController.viewClass),

    app.post('/addclass', 
        ClassController.addClass),
    
    app.put('/viewclass/:classid',
        ClassController.updateClass),

    app.get('/viewclass/:classid',
        ClassController.singleClass)
    
    app.delete('/viewclass/:classid',
        ClassController.deleteClass)

    //Routes for Courses
    app.get('/viewcourse',
        CourseController.viewCourse),

    app.post('/addcourse', 
        CourseController.addCourse),
    
    app.put('/viewcourse/:courseid',
        CourseController.updateCourse),

    app.get('/viewcourse/:courseid',
        CourseController.singleCourse)
    
    app.delete('/viewcourse/:courseid',
        CourseController.deleteCourse)
    
    //Routes for Questions
    app.get('/viewquestion',
        QuestionController.viewQuestion),

    app.post('/addquestion', 
        QuestionController.addQuestion),

    app.put('/viewquestion/:questionid',
        QuestionController.updateQuestion),

    app.get('/viewquestion/:questionid',
        QuestionController.singleQuestion)

    app.delete('/viewquestion/:questionid',
        QuestionController.deleteQuestion)

    // Route For Question Using Course As Params
    app.get('/generatepaper/:course',
        QuestionController.singleQuestionByCourse)

    //Routes for Question Papers
    app.get('/questionvault',
        PaperController.viewPaper),

    app.post('/generatepaper', 
        PaperController.addPaper),

    app.get('/viewquestion/:paperid',
        PaperController.singlePaper)

    app.delete('/questionvault/:paperid',
        PaperController.deletePaper)
}