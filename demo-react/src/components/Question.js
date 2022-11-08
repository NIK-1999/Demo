import React from 'react';
import styles from './Question.module.css';

function Question(props) {
  const { question, answerQuestion } = props;

  return (
    <>
      <div className={styles.question}>
        <div>
          <h4>Question {question.id + 1}</h4>
          <small>
            <a href='#'>Report</a>
          </small>
        </div>
        <p>{question.question}</p>
      </div>

      <div className={styles.options}>
        {question.answers.map((option, index) => {
          return (
            <label key={index}>
              <input
                type='radio'
                name='option'
                checked={question.selectedAnswer === index}
                onChange={() => answerQuestion(index)}
              />
              <span>{option}</span>
            </label>
          );
        })}
      </div>
    </>
  );
}

export default Question;
