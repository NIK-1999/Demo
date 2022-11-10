import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import styles from './QuestionList.module.css';

function QuestionList(props) {
  return (
    <ul className={styles.container}>
      {props.questions.map((question, index) => {
        const className = `${question === props.curQuestion ? styles.currentQuestion : ''} 
                           ${question.selectedAnswer !== -1 ? styles.answeredQuestion : ''} 
                           ${question.isMarked ? styles.markedQuestion : ''}`;

        return (
          <li
            key={index}
            className={className}
            onClick={() => props.changeQuestion(question.subjectId, question.id)}>
            <a href='#'>{index + 1}</a>
          </li>
        );
      })}
    </ul>
  );
}

QuestionList.propTypes = {
  questions: PropTypes.arrayOf(
    PropTypes.shape({
      question: PropTypes.string.isRequired,
      answers: PropTypes.arrayOf(PropTypes.string).isRequired,
      correctAnswer: PropTypes.number.isRequired,
    })
  ),
  curQuestion: PropTypes.shape({
    question: PropTypes.string.isRequired,
    answers: PropTypes.arrayOf(PropTypes.string).isRequired,
    correctAnswer: PropTypes.number.isRequired,
  }),
  changeQuestion: PropTypes.func,
};

QuestionList.defaultProps = {
  questions: [],
  curQuestion: {},
  changeQuestion: () => {},
};

export default QuestionList;
