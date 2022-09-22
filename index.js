import data from './data.json' assert {type : "json"};

(function () {

const CreateDB = function (val) {
    
    const db = {
        
        curSubject: 0,
        curQuestion: 0,
        data: val
    };
    
    this.getCurrentSubject = function () {

        return db.curSubject;
    };

    this.getCurrentQuestion = function () {

        return db.curQuestion;
    };

    this.setCurrentQuestion = function (sid, qid) {

        db.curSubject = sid;
        db.curQuestion = qid;
    };
    
    this.getNumSubject = function () {
        
        return db.data.length;
    };
    
    this.getSubject = function (subID) {
      
        return db.data[subID];
    };
    
    this.getNumQuestion = function (subID) {
        
        return db.data[subID].questions.length;
    };
    
    this.getQuestion = function (subID, queID) {
        
        return db.data[subID].questions[queID];
    }
    
    this.setAnswer = function (index) {
        
        if (index !== -1)
            increaseAnsweredQuestion.call(this);
        else
            decreaseAnsweredQuestion.call(this);
            
        this.getQuestion(db.curSubject, db.curQuestion).selectedIndex = index;
    }
    
    this.markQuestion = function (val) {
        
        const question = this.getQuestion(db.curSubject, db.curQuestion);
        
        if(val && !question.isMarked)
            increaseMarkedQuestion.call(this);
        if(!val && question.isMarked)
            decreaseMarkedQuestion.call(this);
            
        this.getQuestion(db.curSubject, db.curQuestion).isMarked = val;
    }
    
    this.isQuestionAnswered = function (sid, qid) {
        
        return this.getQuestion(sid, qid).selectedIndex !== -1;
    }
    
    this.isQuestionMarked = function (sid, qid) {
        
        return this.getQuestion(sid, qid).isMarked;
    }
    
    this.getAnsweredQuestion = function (subID) {
        
        return db.data[subID].answeredQuestions;
    }
    
    this.getMarkedQuestion = function (subID) {
        
        return db.data[subID].markedQuestions;
    }
    
    this.getUnAnsweredQuestion = function (subID) {
        
        return this.getNumQuestion(subID) - db.data[subID].answeredQuestions;
    }
    
    const increaseAnsweredQuestion = function () {
        
        const sid = db.curSubject;
        const qid = db.curQuestion;
        
        if((db.data[sid].answeredQuestions + this.getMarkedQuestion(sid) < this.getNumQuestion(sid)) && !this.isQuestionAnswered(sid, qid))
            db.data[sid].answeredQuestions += 1;
    }
    
    const increaseMarkedQuestion = function () {
        
        const sid = db.curSubject;
        const qid = db.curQuestion;
        
        if((db.data[sid].markedQuestions + this.getAnsweredQuestion(sid) < this.getNumQuestion(sid)) && !this.isQuestionMarked(sid, qid))
            db.data[sid].markedQuestions += 1;
    }
    
    const decreaseAnsweredQuestion = function () {
        
        const sid = db.curSubject;
        const qid = db.curQuestion;
        
        if(db.data[sid].answeredQuestions > 0 && this.isQuestionAnswered(sid, qid))
            db.data[sid].answeredQuestions -= 1;
    }
    
    const decreaseMarkedQuestion = function () {
        
        const sid = db.curSubject;
        const qid = db.curQuestion;
        
        if(db.data[sid].markedQuestions > 0 && this.isQuestionMarked(sid, qid))
            db.data[sid].markedQuestions -= 1;
    }
        
    for(let i = 0; i < this.getNumSubject(); i++) {

        db.data[i].id = i;
        db.data[i].answeredQuestions = 0;
        db.data[i].markedQuestions = 0;

        for(let j = 0; j < this.getNumQuestion(i); j++) {

            db.data[i].questions[j].id = j;
            db.data[i].questions[j].selectedIndex = -1;
            db.data[i].questions[j].isMarked = false;
        }
    }
}

const CreateUI = function () {
    
    const refreshCurQuestionMarker = function (sid, qid) {
        
        document.getElementsByClassName("questionList")[db.getCurrentSubject()].getElementsByTagName("li")[db.getCurrentQuestion()].classList.remove("currentQuestion");
        
        db.setCurrentQuestion(sid, qid);
        
        document.getElementsByClassName("questionList")[db.getCurrentSubject()].getElementsByTagName("li")[db.getCurrentQuestion()].classList.add("currentQuestion");
    }
    
    const internalUpdateQuestion = function (question) {
        
        const questionEL = document.getElementsByClassName("question")[0];
        
        questionEL.getElementsByTagName("h4")[0].innerHTML = `Question${question.id + 1}`;
        
        questionEL.getElementsByTagName("p")[0].innerHTML = question.question;
    }
    
    const internalUpdateOptions = function (question) {
        
        const optionsEL = document.getElementsByClassName("options")[0].getElementsByTagName("label");
        
        for(let i = 0; i < optionsEL.length; i++) {
            
            optionsEL[i].getElementsByTagName("span")[0].innerHTML = question.answers[i];
            
            optionsEL[i].getElementsByTagName("input")[0].checked = false;
        }
        
        if(question.selectedIndex !== -1) {
            optionsEL[question.selectedIndex].getElementsByTagName("input")[0].checked = true;
        }
    }
    
    this.updateQuestion = function (sid, qid) {
        
        const question = db.getQuestion(sid, qid);
        
        internalUpdateQuestion(question);
        internalUpdateOptions(question)
        refreshCurQuestionMarker(sid, qid);
    };
    
    this.addSubject = function (subject) {
        
        const testData = document.getElementsByClassName("testData")[0];
    
        const section = document.createElement("section");
        const title = document.createElement("h3");
        const instruction = document.createElement("small");
        const metaData = createQuestionMetaData();
        const list = createQuestionList(subject.questions);

        title.innerHTML = subject.title;
        instruction.innerHTML = "Attempt All";

        section.appendChild(title);
        section.appendChild(instruction);
        section.appendChild(metaData);
        section.appendChild(list);

        section.className = "sub";
        section.id = `sub${subject.id}`;

        testData.appendChild(section);
    };
    
    this.answerQuestion = function () {
        
        document.getElementsByClassName("questionList")[db.getCurrentSubject()].getElementsByTagName("li")[db.getCurrentQuestion()].classList.add("answeredQuestion");
        
        updateMetaData();
    };
    
    this.clearQuestion = function () {
        
        document.getElementsByClassName("questionList")[db.getCurrentSubject()].getElementsByTagName("li")[db.getCurrentQuestion()].classList.remove("answeredQuestion");
        
        const optionsEL = document.querySelectorAll(".options > label > input");
        
        for(let i = 0; i < 4; i++)
            optionsEL[i].checked = false;
        
        updateMetaData();
    };
    
    this.markQuestion = function () {
        
        document.getElementsByClassName("questionList")[db.getCurrentSubject()].getElementsByTagName("li")[db.getCurrentQuestion()].classList.add("markedQuestion"); 
        
        updateMetaData();
    };
    
    this.unmarkQuestion = function () {
        
        document.getElementsByClassName("questionList")[db.getCurrentSubject()].getElementsByTagName("li")[db.getCurrentQuestion()].classList.remove("markedQuestion"); 
        
        updateMetaData();
    };
    
    const updateMetaData = function () {
        
        const sid = db.getCurrentSubject();
        
        const metaData = document.querySelectorAll(".questionMetaData > li > span");
        
        metaData[(sid * 3) + 0].innerHTML = " " + db.getAnsweredQuestion(sid) + " ";
        metaData[(sid * 3) + 1].innerHTML = " " + db.getMarkedQuestion(sid) + " ";
        metaData[(sid * 3) + 2].innerHTML = " " + db.getUnAnsweredQuestion(sid) + " ";
    }
}

const answerQuestion = function (event) {
    
    const oid = Number(event.target.id.replace(/[^0-9]/g,'')) - 1;
    db.setAnswer(oid);
    ui.answerQuestion();  // wrap this in controller: update db then ui
}

const clearQuestion = function () {
    
    db.setAnswer(-1);
    ui.clearQuestion();
}

const markQuestion = function () {
    
    db.markQuestion(true);
    ui.markQuestion();
}

const refreshQuestion = function (event) {
    
    if(event.target.tagName === "A") {
        
        const sid = Number(event.target.closest(".sub").id.replace(/[^0-9]/g, ''));
        const qid = Number(event.target.innerHTML) - 1;
        
        ui.updateQuestion(sid, qid);
    }
}

const createQuestionMetaData = function () {
    
    const ul = document.createElement("ul");
    const li1 = document.createElement("li");
    const li2 = document.createElement("li");
    const li3 = document.createElement("li");
    
    li1.innerHTML = '<i class="fa-solid fa-circle" style="color: #737373"></i><span> 0 </span>answered';
    li2.innerHTML = '<i class="fa-solid fa-circle" style="color: #e68a00"></i><span> 0 </span>marked';
    li3.innerHTML = '<i class="fa-regular fa-circle"></i><span> 0 </span>unanswered';
    
    ul.appendChild(li1);
    ul.appendChild(li2);
    ul.appendChild(li3);
    
    ul.className = "questionMetaData";
    
    return ul;
}

const createQuestionList = function (questions) {
    
    const ul = document.createElement("ul");
    
    for(let i = 0; i < questions.length; i++) {
        
        const li = document.createElement("li");
        li.innerHTML = `<a href="#">${i+1}</a>`;
        ul.appendChild(li);
    }
    
    ul.className = "questionList";
    ul.addEventListener("click", refreshQuestion);
    
    return ul;
}

const db = new CreateDB(data);
const ui = new CreateUI();
    
for (let i = 0; i < db.getNumSubject(); i++)
    ui.addSubject (db.getSubject(i));
    
ui.updateQuestion(db.getCurrentSubject(), db.getCurrentQuestion());
    
const optionsEL = document.getElementsByClassName("options")[0].getElementsByTagName("input");
    
for (let i = 0; i < 4; i++)
    optionsEL[i].addEventListener("click", answerQuestion);
    
document.getElementById("clearBtn").addEventListener("click", clearQuestion);
    
document.getElementById("markBtn").addEventListener("click", markQuestion);

})();