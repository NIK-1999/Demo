export default function createEventHandler (db, ui) {

    this.previousQuestion = function () {

        let sid = db.getCurrentSubject();
        const qid = db.getCurrentQuestion();
        const numSub = db.getNumberOfSubject();
        let numQue = db.getNumberOfQuestion(sid);

        if(qid > 0) {

            ui.updateQuestion(sid, qid - 1);
        }
        else if(sid > 0) {

            sid = sid - 1;
            numQue = db.getNumberOfQuestion(sid);

            ui.updateQuestion(sid, numQue - 1);
        }
    };

    this.nextQuestion = function () {

        const sid = db.getCurrentSubject();
        const qid = db.getCurrentQuestion();
        const numSub = db.getNumberOfSubject();
        const numQue = db.getNumberOfQuestion(sid);

        if(qid < numQue - 1)
            ui.updateQuestion(sid, qid + 1);
        else if(sid < numSub - 1)
            ui.updateQuestion(sid + 1, 0);
    };

    this.toggleQuestion = (event) => {
        
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
    };

    this.answerQuestion = function (event) {
        
        const oid = event.target.dataset.optionNumber - 1;
        
        db.setAnswer(oid);
        ui.answerQuestion();
    };

    this.clearQuestion = function () {

        db.setAnswer(-1);
        ui.clearQuestion();
    };

    this.markQuestion = function () {

        if (db.isQuestionMarked(db.getCurrentSubject(), db.getCurrentQuestion())) {

            db.markQuestion(false);
            ui.unmarkQuestion();
            return;
        }

        db.markQuestion(true);
        ui.markQuestion();
    };

    this.refreshQuestion = (event) => {
        
        const dataset = event.target.dataset;
        
        if(('subjectId' in dataset) && ('questionId' in dataset))
            ui.updateQuestion(Number(dataset.subjectId), Number(dataset.questionId));
        
        const optionsEL = document.getElementsByClassName("options")[0].getElementsByTagName("input");
        
        for (let i = 0; i < 4; i++)
            optionsEL[i].addEventListener("click", this.answerQuestion);
        
    };
}