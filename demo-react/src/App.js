import React, { useMemo, useReducer, useRef, useState } from 'react';
import ScoreCard from './components/score_card/ScoreCard';
import Header from './components/header/Header.js';
import Question from './components/question/Question.js';
import Footer from './components/footer/Footer.js';
import Sidebar from './components/sidebar/Sidebar';
import styles from './App.module.css';
import data from './data/data.js';
import stateReducer from './reducers/stateReducer';

const initialState = {
  subjects: data.subjects,
  subjectId: 0,
  questionId: 0,
};

function App() {
  const [state, dispatch] = useReducer(stateReducer, initialState);
  const [isTestEnded, setIsTestEnded] = useState(false);
  const [timerId, setTimerId] = useState(0);
  const curQuestion = state.subjects[state.subjectId].questions[state.questionId];

  const endTest = () => {
    clearInterval(timerId);
    setIsTestEnded(true);
  };

  const answerQuestion = (ans) => {
    dispatch({
      type: 'ANSWER_QUESTION',
      payload: ans,
    });
  };

  const changeQuestion = (subjectId, questionId) => {
    dispatch({
      type: 'CHANGE_QUESTION',
      payload: {
        subjectId,
        questionId,
      },
    });
  };

  return (
    <div className={styles.container}>
      {isTestEnded && <ScoreCard subjects={state.subjects} />}
      <div className={styles.content}>
        <Header testDuration={data.duration} endTest={endTest} setTimerId={setTimerId} />
        <Question question={curQuestion} answerQuestion={answerQuestion} />
        <Footer
          state={state}
          changeQuestion={changeQuestion}
          clearQuestion={() => dispatch({ type: 'CLEAR_QUESTION' })}
          markQuestion={() => dispatch({ type: 'TOGGLE_QUESTION_MARKING' })}
        />
      </div>
      <Sidebar
        subjects={state.subjects}
        curQuestion={curQuestion}
        changeQuestion={changeQuestion}
        endTest={endTest}
      />
    </div>
  );
}

export default App;
