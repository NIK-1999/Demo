const Footer = function () {
    
    let controller;
    
    this.init = function (controller_) {
        
        controller = controller_;
        
        this.previousButton = document.getElementById("previousBtn");
        this.clearButton = document.getElementById("clearBtn");
        this.markButton = document.getElementById("markBtn");
        this.nextButton = document.getElementById("nextBtn");
        
        this.previousButton.addEventListener("click", controller.previousQuestion);
        
        this.clearButton.addEventListener("click", controller.clearQuestion);

        this.markButton.addEventListener("click", controller.markQuestion);
    
        this.nextButton.addEventListener("click", controller.nextQuestion);
        
    },
    
    this.render = function () {
        
        const question = controller.getCurrentQuestion();
        
        this.markButton.innerHTML = question.isMarked ? '<i class="fa-solid fa-bookmark" style="color: #e68a00"></i> Marked' : '<i class="fa-regular fa-bookmark"></i> Mark';
    };
};

export default (new Footer());