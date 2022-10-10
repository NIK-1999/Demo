const Question = function () {
    
    let controller;
    
    this.init = function (controller_) {
        
        controller = controller_;
        this.render();
    };
    
    this.render = function () {
        
        const question = controller.getCurrentQuestion();
        
        this.questionElement = document.getElementsByClassName("question")[0];
        
        this.optionsElement = document.getElementsByClassName("options")[0];
        
        this.questionElement.replaceWith(createQuestion(question));
        this.optionsElement.replaceWith(createOptions(question.selectedAnswer, question.options));
    };
    
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
    };

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
    };
};

export default (new Question());