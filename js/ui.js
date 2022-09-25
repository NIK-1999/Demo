export default function CreateUI (db, timer) {
    
    const updateMetaData = function () {
        
        const sid = db.getCurrentSubject();
        
        const metaData = document.querySelectorAll(".questionMetaData > li > span");
        
        metaData[(sid * 3) + 0].innerHTML = " " + db.getAnsweredQuestion(sid) + " ";
        metaData[(sid * 3) + 1].innerHTML = " " + db.getMarkedQuestion(sid) + " ";
        metaData[(sid * 3) + 2].innerHTML = " " + db.getUnAnsweredQuestion(sid) + " ";
    }
    
    const refreshCurQuestionMarker = function (sid, qid) {
        
        document.getElementsByClassName("questionList")[db.getCurrentSubject()].getElementsByTagName("li")[db.getCurrentQuestion()].classList.remove("currentQuestion");
        
        db.setCurrentQuestion(sid, qid);
        
        document.getElementsByClassName("questionList")[db.getCurrentSubject()].getElementsByTagName("li")[db.getCurrentQuestion()].classList.add("currentQuestion");
    }
    
    const refreshMarkBtn = function (sid, qid) {
        
        if(db.isQuestionMarked(sid, qid)) {
        
            document.getElementById("markBtn").innerHTML = '<i class="fa-solid fa-bookmark" style="color: #e68a00"></i> Marked';
        }
        else {
            
            document.getElementById("markBtn").innerHTML = '<i class="fa-regular fa-bookmark"></i> Mark';
        }
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
        refreshMarkBtn(sid, qid);
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
        
        refreshMarkBtn(db.getCurrentSubject(), db.getCurrentQuestion());
        
        updateMetaData();
    };
    
    this.unmarkQuestion = function () {
        
        document.getElementsByClassName("questionList")[db.getCurrentSubject()].getElementsByTagName("li")[db.getCurrentQuestion()].classList.remove("markedQuestion"); 
        
        refreshMarkBtn(db.getCurrentSubject(), db.getCurrentQuestion());
        
        updateMetaData();
    };
    
    this.refreshTime = function () {
        
        const time = timer.getRemainingTime();
        const h = (time.hours < 10) ? ('0' + time.hours) : (time.hours);
        const m = (time.minutes < 10) ? ('0' + time.minutes) : (time.minutes);
        const s = (time.seconds < 10) ? ('0' + time.seconds) : (time.seconds);
        
        let res = h + " : " + m + " : " + s;
        
        document.getElementById("timer").innerHTML = res;
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
    
    return ul;
}
