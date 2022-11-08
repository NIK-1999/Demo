import React, { useContext } from 'react';
import styles from './QuestionList.module.css';
import { CurQuestionContext } from '../App';

function QuestionList(props) {
  return (
    <ul className={styles.container}>
      {props.questions.map((question, index) => {
        const className = `${question === props.curQuestion ? styles.currentQuestion : ''} 
                           ${question.selectedAnswer !== -1 ? styles.answeredQuestion : ''} 
                           ${question.isMarked ? styles.markedQuestion : ''}`;

        return (
          <li key={index} className={className} onClick={() => props.changeQuestion(question)}>
            <a href='#'>{index + 1}</a>
          </li>
        );
      })}
    </ul>
  );
}

export default QuestionList;
