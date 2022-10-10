import model from '../model/subjects.js';
import timer from '../model/timer.js';
import sidebarView from '../view/sidebar.js';
import questionView from '../view/question.js';
import footerView from '../view/footer.js';
import scoreCardView from '../view/scorecard.js';
import timerView from '../view/timer.js';

const controller = {
    
    init: function () {
        
        model.init();
        sidebarView.init(this);
        questionView.init(this);
        footerView.init(this);
        timerView.init(this);
        scoreCardView.init();
        
        document.addEventListener("keydown", this.toggleQuestion.bind(this));
        
        timer.start(model.duration);
    },
    
    getSubjects: function () {
        
        return model.list;
    },
    
    getCurrentQuestion: function () {
      
        return model.currentQuestion;
    },
    
    getAnsweredQuestion: function (subjectID) {
        
        const subject = model.list[subjectID];
        
        return subject.questions.reduce(function (pre, cur) {
            
            if(cur.selectedAnswer !== -1)
                pre++;
            
            return pre;
            
        }, 0);
    },
    
    getMarkedQuestion: function (subjectID) {
        
        const subject = model.list[subjectID];
        
        return subject.questions.reduce(function (pre, cur) {
            
            if(cur.isMarked)
                pre++;
            
            return pre;
            
        }, 0);
    },
    
    getUnAnsweredQuestion: function (subjectID) {
        
        return model.list[subjectID].questions.length - this.getAnsweredQuestion(subjectID);
    },
    
    changeQuestion: function (event) {
        
        const dataset = event.target.dataset;
        
        if(('subjectId' in dataset) && ('questionId' in dataset)) {
            
            const question = model.list[dataset.subjectId].questions[dataset.questionId];
            
            if (model.currentQuestion !== question) {
                
                model.currentQuestion = question;
                sidebarView.render();
                questionView.render();
                footerView.render();
            }
        }
    },
    
    answerQuestion: function (event) {
        
        const optionID = event.target.dataset.optionNumber - 1;
        
        const prevAnswer = model.currentQuestion.selectedAnswer;
        model.currentQuestion.selectedAnswer = optionID;
        
        if(prevAnswer === -1)
            sidebarView.render();
    },

    toggleQuestion: function (event) {
        
        if(!event.target.id || !event.target.id.includes('option')) {

            switch(event.key) {

                case "ArrowLeft":
                    this.previousQuestion();
                    break;
                case "ArrowRight":
                    this.nextQuestion();
                    break;
            }
        }
    },

    previousQuestion: function () {
        
        let subjectID = model.currentQuestion.subjectID;
        const questionID = model.currentQuestion.id;
        const numberOFSubject = model.list.length;
        let numberOFQuestion = model.list[subjectID].questions.length;

        if(questionID > 0) {

            model.currentQuestion = model.list[subjectID].questions[questionID - 1];
        }
        else if(subjectID > 0) {

            subjectID -= 1;
            numberOFQuestion = model.list[subjectID].questions.length;

            model.currentQuestion = model.list[subjectID].questions[numberOFQuestion - 1];
        }
        
        sidebarView.render();
        questionView.render();
        footerView.render();
    },
    
    clearQuestion: function () {

        model.currentQuestion.selectedAnswer = -1;
        questionView.render();
        sidebarView.render();
    },

    markQuestion: function () {

        model.currentQuestion.isMarked = !model.currentQuestion.isMarked;
        
        footerView.render();
        sidebarView.render();
    },
    
    nextQuestion: function () {
        
        const subjectID = model.currentQuestion.subjectID;
        const questionID = model.currentQuestion.id;
        const numberOFSubject = model.list.length;
        const numberOFQuestion = model.list[subjectID].questions.length;
        
        if(questionID < numberOFQuestion - 1) {
            
            model.currentQuestion = model.list[subjectID].questions[questionID + 1];
        }
        else if(subjectID < numberOFSubject - 1) {
            
            model.currentQuestion = model.list[subjectID + 1].questions[0];
        }
        
        sidebarView.render();
        questionView.render();
        footerView.render();
    },
    
    getRemainingTime: function () {
        
        return timer.updateTime();
    },
    
    endTest: function () {
        
        const score = model.getScore();
        
        scoreCardView.render(score);
        
        clearInterval(window.timerID);
    }
};

controller.init();