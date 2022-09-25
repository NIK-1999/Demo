export default function createEventHandler (db, ui) {

    this.previousQuestion = function () {

        let sid = db.getCurrentSubject();
        const qid = db.getCurrentQuestion();
        const numSub = db.getNumSubject();
        let numQue = db.getNumQuestion(sid);

        if(qid > 0) {

            ui.updateQuestion(sid, qid - 1);
        }
        else if(sid > 0) {

            sid = sid - 1;
            numQue = db.getNumQuestion(sid);

            ui.updateQuestion(sid, numQue - 1);
        }
    };

    this.nextQuestion = function () {

        const sid = db.getCurrentSubject();
        const qid = db.getCurrentQuestion();
        const numSub = db.getNumSubject();
        const numQue = db.getNumQuestion(sid);

        if(qid < numQue - 1)
            ui.updateQuestion(sid, qid + 1);
        else if(sid < numSub - 1)
            ui.updateQuestion(sid + 1, 0);
    };

    this.toggleQuestion = (event) => {

        if(event.target.tagName !== 'INPUT') {

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

        const oid = Number(event.target.id.replace(/[^0-9]/g,'')) - 1;
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

    this.refreshQuestion = function (event) {

        if(event.target.tagName === "A") {

            const sid = Number(event.target.closest(".sub").id.replace(/[^0-9]/g, ''));
            const qid = Number(event.target.innerHTML) - 1;

            ui.updateQuestion(sid, qid);
        }
    };
}