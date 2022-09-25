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
    
    this.updateQuestion = function (sid, qid) {
        
        const question = db.getQuestion(sid, qid);
        
        document.getElementsByClassName("question")[0].replaceWith(createQuestion(question));
        
        document.getElementsByClassName("options")[0].replaceWith(createOptions(question.selectedAnswer, question.answers));
    
        refreshCurQuestionMarker(sid, qid);
        refreshMarkBtn(sid, qid);
    };
    
    this.addSubject = function (subject) {
        
        document.getElementsByClassName("testData")[0].appendChild(createSubject(subject));
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
    
    this.refreshTime = () => {
        
        const time = timer.getRemainingTime();
        
        if(time.seconds < 0) {
            this.showScoreCard(db.getScore());
            return;
        }
        
        const h = (time.hours < 10) ? ('0' + time.hours) : (time.hours);
        const m = (time.minutes < 10) ? ('0' + time.minutes) : (time.minutes);
        const s = (time.seconds < 10) ? ('0' + time.seconds) : (time.seconds);
        
        let res = h + " : " + m + " : " + s;
        
        document.getElementById("timer").innerHTML = res;
    }
    
    this.showScoreCard = function (score) {
        
        document.getElementsByClassName("result")[0].replaceWith(createScoreCard(score));
        
        document.getElementsByClassName("result")[0].style.visibility = "visible";
        
        clearInterval(window.timerId);
    }
}

const createOptions = function (selectedAnswer, options) {
    
    const div = document.createElement("div");
    
    options.forEach(function (item, index) {
        
        const label = document.createElement("label");
        const input = document.createElement("input");
        const span = document.createElement("span");
        
        input.type = "radio";
        input.name = "option";
        input.dataset.optionNumber = index + 1;
        
        if(selectedAnswer === index)
            input.checked = true;
        
        span.innerHTML = item;
        
        label.appendChild(input);
        label.appendChild(span);
        
        div.appendChild(label);
    });
    
    div.className = "options";

    return div;
}

const createQuestion = function (question) {
    
    const parentDiv = document.createElement("div");
    const childDiv = document.createElement("div");
    const h4 = document.createElement("h4");
    const small = document.createElement("small");
    const p = document.createElement("p");
    
    h4.innerHTML = `Question${question.id + 1}`;
    small.innerHTML = "<a href='#'>Report</a>";
    p.innerHTML = question.question;
    
    childDiv.appendChild(h4);
    childDiv.appendChild(small);
    
    parentDiv.appendChild(childDiv);
    parentDiv.appendChild(p);
    parentDiv.className = "question";
    
    return parentDiv;
}

const createSubject = function (subject) {
    
    const section = document.createElement("section");
    const title = document.createElement("h3");
    const instruction = document.createElement("small");
    const metaData = createQuestionMetaData();
    const list = createQuestionList(subject.id, subject.questions);

    title.innerHTML = subject.title;
    instruction.innerHTML = "Attempt All";

    section.appendChild(title);
    section.appendChild(instruction);
    section.appendChild(metaData);
    section.appendChild(list);
    
    return section;
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

const createQuestionList = function (sid, questions) {
    
    const ul = document.createElement("ul");
    
    for(let i = 0; i < questions.length; i++) {
        
        const li = document.createElement("li");
        li.innerHTML = `<a href="#" data-subject-id="${sid}" data-question-id="${i}">${i+1}</a>`;
        ul.appendChild(li);
    }
    ul.className = "questionList";
    
    return ul;
}

const createScoreCard = function (score) {
    
    const parentDiv = document.createElement("div");
    const childDiv = document.createElement("div");
    const h2 = document.createElement("h2");
    const hr = document.createElement("hr");
    
    let overallCorrectQuestions = 0;
    let overallQuections = 0;
    
    h2.innerHTML = "Score Card";
    
    childDiv.appendChild(h2);
    
    score.forEach(function (item, i) {
       
        const section = document.createElement("section");
        const p = document.createElement("p");
        const span = document.createElement("span");
        
        p.innerHTML = item.title;
        span.innerHTML = `${score[i].correctQuestions}/${score[i].totalQuestions}`;
        
        overallCorrectQuestions += score[i].correctQuestions;
        overallQuections += score[i].totalQuestions;
        
        section.appendChild(p);
        section.appendChild(span);
        
        childDiv.appendChild(section);
    });
    
    childDiv.appendChild(hr);
    
    const section = document.createElement("section");
    const p = document.createElement("p");
    const span = document.createElement("span");

    p.innerHTML = "Total";
    span.innerHTML = `${overallCorrectQuestions}/${overallQuections}`;

    section.appendChild(p);
    section.appendChild(span);

    childDiv.appendChild(section);
    
    parentDiv.appendChild(childDiv);
    parentDiv.className = "result";
    
    return parentDiv;
}
