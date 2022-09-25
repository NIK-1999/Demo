import data from '../data/data.json' assert {type : "json"};

export default function CreateDB () {
    
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
    
    this.getNumSubject = function () {
        
        return store.data.length;
    };
    
    this.getSubject = function (subID) {
      
        return store.data[subID];
    };
    
    this.getNumQuestion = function (subID) {
        
        return store.data[subID].questions.length;
    };
    
    this.getQuestion = function (subID, queID) {
        
        return store.data[subID].questions[queID];
    }
    
    this.setAnswer = function (index) {
        
        if (index !== -1)
            increaseAnsweredQuestion.call(this);
        else
            decreaseAnsweredQuestion.call(this);
            
        this.getQuestion(store.curSubject, store.curQuestion).selectedIndex = index;
    }
    
    this.markQuestion = function (val) {
        
        const question = this.getQuestion(store.curSubject, store.curQuestion);
        
        if(val && !question.isMarked)
            increaseMarkedQuestion.call(this);
        if(!val && question.isMarked)
            decreaseMarkedQuestion.call(this);
            
        this.getQuestion(store.curSubject, store.curQuestion).isMarked = val;
    }
    
    this.isQuestionAnswered = function (sid, qid) {
        
        return this.getQuestion(sid, qid).selectedIndex !== -1;
    }
    
    this.isQuestionMarked = function (sid, qid) {
        
        return this.getQuestion(sid, qid).isMarked;
    }
    
    this.getAnsweredQuestion = function (subID) {
        
        return store.data[subID].answeredQuestions;
    }
    
    this.getMarkedQuestion = function (subID) {
        
        return store.data[subID].markedQuestions;
    }
    
    this.getUnAnsweredQuestion = function (subID) {
        
        return this.getNumQuestion(subID) - store.data[subID].answeredQuestions;
    }
    
    const increaseAnsweredQuestion = function () {
        
        const sid = store.curSubject;
        const qid = store.curQuestion;
        
        if((store.data[sid].answeredQuestions < this.getNumQuestion(sid)) && !this.isQuestionAnswered(sid, qid))
            store.data[sid].answeredQuestions += 1;
    }
    
    const increaseMarkedQuestion = function () {
        
        const sid = store.curSubject;
        const qid = store.curQuestion;
        
        if((store.data[sid].markedQuestions < this.getNumQuestion(sid)) && !this.isQuestionMarked(sid, qid))
            store.data[sid].markedQuestions += 1;
    }
    
    const decreaseAnsweredQuestion = function () {
        
        const sid = store.curSubject;
        const qid = store.curQuestion;
        
        if(store.data[sid].answeredQuestions > 0 && this.isQuestionAnswered(sid, qid))
            store.data[sid].answeredQuestions -= 1;
    }
    
    const decreaseMarkedQuestion = function () {
        
        const sid = store.curSubject;
        const qid = store.curQuestion;
        
        if(store.data[sid].markedQuestions > 0 && this.isQuestionMarked(sid, qid))
            store.data[sid].markedQuestions -= 1;
    }
        
    for(let i = 0; i < this.getNumSubject(); i++) {

        store.data[i].id = i;
        store.data[i].answeredQuestions = 0;
        store.data[i].markedQuestions = 0;

        for(let j = 0; j < this.getNumQuestion(i); j++) {

            store.data[i].questions[j].id = j;
            store.data[i].questions[j].selectedIndex = -1;
            store.data[i].questions[j].isMarked = false;
        }
    }
}
