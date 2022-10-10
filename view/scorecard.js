const ScoreCard = function () {
    
    this.init = function () {
        
        document.getElementsByClassName("result")[0].style.visibility = "hidden";
    };
    
    this.render = function (score) {
        
        document.getElementsByClassName("result")[0].replaceWith(createScoreCard(score));
        
        document.getElementsByClassName("result")[0].style.visibility = "visible";
    };
    
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
    };
};

export default (new ScoreCard());