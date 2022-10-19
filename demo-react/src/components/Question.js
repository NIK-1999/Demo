import React, { useContext, useState } from 'react';
import { CurQuestionContext } from '../App';
import styles from './Question.module.css';

function Question() {
  const { curQuestion, dispatch } = useContext(CurQuestionContext);
  const [answer, setAnswer] = useState(-1);

  const answerQuestion = (e) => {
    const ans = Number(e.target.value);

    if (curQuestion.selectedAnswer !== -1) {
      curQuestion.selectedAnswer = ans;
      setAnswer(ans);
    } else {
      dispatch({
        type: 'answer',
        selectedAnswer: ans,
      });
    }
  };

  return (
    <>
      <div className={styles.question}>
        <div>
          <h4>Question {curQuestion.id + 1}</h4>
          <small>
            <a href='#'>Report</a>
          </small>
        </div>
        <p>{curQuestion.question}</p>
      </div>

      <div className={styles.options}>
        {curQuestion.answers.map((option, index) => {
          return (
            <label key={index}>
              <input
                value={index}
                type='radio'
                name='option'
                checked={curQuestion.selectedAnswer === index}
                onChange={answerQuestion}
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
