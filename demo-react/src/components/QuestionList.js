import React, { useContext } from "react";
import styles from "./QuestionList.module.css";
import { CurQuestionContext } from "../App";

function QuestionList (props) {

    const curQuestionContext = useContext(CurQuestionContext);

    const changeQuestion = (e) => {

        if('questionId' in e.target.dataset) {

            const question = props.questions[e.target.dataset.questionId];
            curQuestionContext.dispatch({
                type: "change",
                subjectId: question.subjectId,
                questionId: question.id
            });
        }
    }

    return (
        <ul onClick={changeQuestion} className={styles.container}>
            {
                props.questions.map((quesion, index) => {
                    
                    const className = `${quesion === curQuestionContext.curQuestion ? styles.currentQuestion : ""} ${quesion.selectedAnswer !== -1 ? styles.answeredQuestion : ""} ${quesion.isMarked ? styles.markedQuestion : ""}`;

                    return (
                        <li key={index} className={className}>
                            <a href="#" data-question-id={index}>{index + 1}</a>
                        </li>
                    );
                })
            }
        </ul>
    );
}

export default QuestionList;