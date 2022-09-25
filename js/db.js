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
        
    for(let i = 0; i < this.getNumberOfSubject(); i++) {

        store.data[i].id = i;

        for(let j = 0; j < this.getNumberOfQuestion(i); j++) {

            store.data[i].questions[j].id = j;
            store.data[i].questions[j].selectedAnswer = -1;
            store.data[i].questions[j].isMarked = false;
        }
    }
}
