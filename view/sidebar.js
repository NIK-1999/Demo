const Sidebar = function () {
    
    let controller;
    
    this.init = function (controller_) {
        
        controller = controller_;
        document.getElementById("endTestBtn").addEventListener("click", controller.endTest);
        
        this.render();
    };
    
    this.render = function () {
        
        this.subjectsElement = document.getElementsByClassName("testData")[0];
        this.subjectsElement.replaceWith(createSubjects(controller.getSubjects()));
    };
    
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
    };

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
    };

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
    };
};

export default (new Sidebar());