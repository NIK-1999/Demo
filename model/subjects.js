import data from '../data/data.json' assert {type : "json"};

const subjects = {
    
    init: function () {
      
        this.list = [];
        
        data.subjects.forEach((subject, index) => {
            
            this.list.push(new Subject(subject, index));
        });
        
        this.currentQuestion = this.list[0].questions[0];
        this.duration = data.duration;
    },
    
    getScore: function () {
        
        const score = [];
        
        this.list.forEach((subject, index) => {
           
            score[index] = {};
            score[index].title = subject.title;
            score[index].totalQuestions = this.list[index].questions.length;
            
            score[index].correctQuestions = subject.questions.reduce(function (pre, cur) {
                
                if(cur.selectedAnswer === cur.correctAnswer)
                    pre++;
                
                return pre;
            }, 0);
            
        });
        
        return score;
    }
};

function Subject (subject, id) {
    
    this.id = id;
    this.title = subject.title;
    this.questions = [];
    
    subject.questions.forEach((question, index) => {
        
        this.questions.push(new Question(this.id, question, index));
    });
}

function Question (subjectID, question, id) {
    
    this.id = id;
    this.subjectID = subjectID;
    this.question = question.question;
    this.options = question.answers;
    this.correctAnswer = question.correctAnswer;
    this.selectedAnswer = -1;
    this.isMarked = false;
}

export default subjects;

/*
function CreateDB () {
    
    const store = {
        
        curSubject: 0,
        curQuestion: 0,
        data: data.data,
        duration: data.time
    };
    
    this.getQuizDuration = function () { 
    
        return store.duration;
    };
    
    this.getCurrentSubject = function () {

        return store.curSubject;
    };

    this.getCurrentQuestion = function () {

        return store.curQuestion;
    };

    this.setCurrentQuestion = function (sid, qid) {

        store.curSubject = sid;
        store.curQuestion = qid;
    };
    
    this.getNumberOfSubject = function () {
        
        return store.data.length;
    };
    
    this.getSubject = function (subID) {
      
        return store.data[subID];
    };
    
    this.getNumberOfQuestion = function (subID) {
        
        return store.data[subID].questions.length;
    };
    
    this.getQuestion = function (subID, queID) {
        
        return store.data[subID].questions[queID];
    }
    
    this.setAnswer = function (index) {
        
        this.getQuestion(store.curSubject, store.curQuestion).selectedAnswer = index;
    }
    
    this.markQuestion = function (val) {
        
        this.getQuestion(store.curSubject, store.curQuestion).isMarked = val;
    }
    
    this.isQuestionMarked = function (sid, qid) {
        
        return this.getQuestion(sid, qid).isMarked;
    }
    
    this.getAnsweredQuestion = function (subID) {
        
        const subject = this.getSubject(subID);
        
        return subject.questions.reduce(function (pre, cur) {
            
            if(cur.selectedAnswer !== -1)
                pre++;
            
            return pre;
            
        }, 0);
    }
    
    this.getMarkedQuestion = function (subID) {
        
        const subject = this.getSubject(subID);
        
        return subject.questions.reduce(function (pre, cur) {
            
            if(cur.isMarked)
                pre++;
            
            return pre;
            
        }, 0);
    }
    
    this.getUnAnsweredQuestion = function (subID) {
        
        return this.getNumberOfQuestion(subID) - this.getAnsweredQuestion(subID);
    }
    
    this.getScore = function () {
        
        const score = [];
        
        store.data.forEach((item, i) => {
           
            score[i] = {};
            score[i].title = item.title;
            score[i].totalQuestions = this.getNumberOfQuestion(i);
            
            score[i].correctQuestions = item.questions.reduce(function (pre, cur) {
                
                if(cur.selectedAnswer === cur.correctAnswer)
                    pre++;
                
                return pre;
            }, 0);
            
        });
        
        return score;
    }
        
    for(let i = 0; i < this.getNumberOfSubject(); i++) {

        store.data[i].id = i;

        for(let j = 0; j < this.getNumberOfQuestion(i); j++) {

            store.data[i].questions[j].id = j;
            store.data[i].questions[j].selectedAnswer = -1;
            store.data[i].questions[j].isMarked = false;
        }
    }
}
*/