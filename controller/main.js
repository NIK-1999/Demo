import model from '../model/subjects.js';
import timer from '../model/timer.js';

/* Controller */

const controller = {
    
    init: function () {
        
        model.init();
        sidebarView.init();
        questionView.init();
        footerView.init();
        headerView.init();
        
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
            sidebarView.render(model.list);
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
        
        console.log(score);
        
        scoreCardView.init(score);
        
        clearInterval(window.timerID);
    }
};

/* Views */

const sidebarView = {
    
    init: function () {
        
        document.getElementById("endTestBtn").addEventListener("click", controller.endTest);
        
        this.render();
    },
    
    render: function () {
        
        const subjects = controller.getSubjects();
        
        this.subjectsElement = document.getElementsByClassName("testData")[0];
        
        this.subjectsElement.replaceWith(createSubjects(subjects));
    }
};

const headerView = {
    
    init: function () {
      
        this.timerElement = document.getElementById("timer");
        window.timerID = setInterval(this.render.bind(this), 1000);
    },
    
    render: function () {
        
        const time = controller.getRemainingTime();
        
        if(time.seconds < 0) {
            
            controller.endTest();
            return;
        }
        
        const h = (time.hours < 10) ? ('0' + time.hours) : (time.hours);
        const m = (time.minutes < 10) ? ('0' + time.minutes) : (time.minutes);
        const s = (time.seconds < 10) ? ('0' + time.seconds) : (time.seconds);
        
        let res = h + " : " + m + " : " + s;
        
        this.timerElement.innerHTML = res;
    }
}

const questionView = {
    
    init: function () {
        
        this.render();
    },
    
    render: function () {
        
        const question = controller.getCurrentQuestion();
        
        this.questionElement = document.getElementsByClassName("question")[0];
        
        this.optionsElement = document.getElementsByClassName("options")[0];
        
        this.questionElement.replaceWith(createQuestion(question));
        this.optionsElement.replaceWith(createOptions(question.selectedAnswer, question.options));
    }
};

const footerView = {
    
    init: function () {
        
        this.previousButton = document.getElementById("previousBtn");
        this.clearButton = document.getElementById("clearBtn");
        this.markButton = document.getElementById("markBtn");
        this.nextButton = document.getElementById("nextBtn");
        
        this.previousButton.addEventListener("click", controller.previousQuestion);
        
        this.clearButton.addEventListener("click", controller.clearQuestion);

        this.markButton.addEventListener("click", controller.markQuestion);
    
        this.nextButton.addEventListener("click", controller.nextQuestion);
        
    },
    
    render: function () {
        
        const question = controller.getCurrentQuestion();
        
        this.markButton.innerHTML = question.isMarked ? '<i class="fa-solid fa-bookmark" style="color: #e68a00"></i> Marked' : '<i class="fa-regular fa-bookmark"></i> Mark';
    }
}

const scoreCardView = {
    
    init: function (score) {
        
        this.render(score);
    },
    
    render: function (score) {
        
        document.getElementsByClassName("result")[0].replaceWith(createScoreCard(score));
        
        document.getElementsByClassName("result")[0].style.visibility = "visible";
    }
}

/* utility functions */

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

const createOptions = function (selectedAnswer, options) {
    
    const div = document.createElement("div");
    
    options.forEach(function (item, index) {
        
        const label = document.createElement("label");
        const input = document.createElement("input");
        const span = document.createElement("span");
        
        input.type = "radio";
        input.name = "option";
        input.dataset.optionNumber = index + 1;
        input.addEventListener("click", controller.answerQuestion);
        
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

const createSubjects = function (subjects) {
    
    const div = document.createElement("div");
        
    subjects.forEach(function (subject, index) {
        
        const section = document.createElement("section");
        const title = document.createElement("h3");
        const instruction = document.createElement("small");
        const metaData = createQuestionMetaData(index);
        const list = createQuestionList(subject.questions);

        title.innerHTML = subject.title;
        instruction.innerHTML = "Attempt All";

        section.appendChild(title);
        section.appendChild(instruction);
        section.appendChild(metaData);
        section.appendChild(list);
        
        div.appendChild(section);
    });
    
    div.className = "testData";
    
    return div;
}

const createQuestionMetaData = function (subjectID) {
    
    const ul = document.createElement("ul");
    const li1 = document.createElement("li");
    const li2 = document.createElement("li");
    const li3 = document.createElement("li");
    
    li1.innerHTML = `<i class="fa-solid fa-circle" style="color: #737373"></i><span> ${controller.getAnsweredQuestion(subjectID)} </span>answered`;
    li2.innerHTML = `<i class="fa-solid fa-circle" style="color: #e68a00"></i><span> ${controller.getMarkedQuestion(subjectID)} </span>marked`;
    li3.innerHTML = `<i class="fa-regular fa-circle"></i><span> ${controller.getUnAnsweredQuestion(subjectID)} </span>unanswered`;
    
    ul.appendChild(li1);
    ul.appendChild(li2);
    ul.appendChild(li3);
    
    ul.className = "questionMetaData";
    
    return ul;
}

const createQuestionList = function (questions) {
    
    const ul = document.createElement("ul");
    
    questions.forEach(function (question) {
       
        const li = document.createElement("li");
        li.innerHTML = `<a href="#" data-subject-id="${question.subjectID}" data-question-id="${question.id}">${question.id + 1}</a>`;
        
        if(question === controller.getCurrentQuestion())
            li.classList.add("currentQuestion");
        
        if(question.selectedAnswer !== -1)
            li.classList.add("answeredQuestion");
        
        if(question.isMarked)
            li.classList.add("markedQuestion");
        
        ul.appendChild(li);
        
    });
    
    ul.className = "questionList";
    ul.addEventListener("click", controller.changeQuestion);
    
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

controller.init();