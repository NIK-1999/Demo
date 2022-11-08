import Content from './components/Content';
import Sidebar from './components/Sidebar';
import styles from './App.module.css';
import { createContext, useEffect, useReducer, useState } from 'react';
import data from './data/data.json';
import ScoreCard from './components/ScoreCard';
import React from 'react';

data.subjects.forEach((subject, subjectIndex) => {
  subject.questions.forEach((question, index) => {
    question.subjectId = subjectIndex;
    question.id = index;
    question.selectedAnswer = -1;
    question.isMarked = false;
  });
});

const initialState = {
  subjectId: 0,
  questionId: 0,
};

const reducer = (state, action) => {
  const { subjectId, questionId } = state;

  switch (action.type) {
    case 'answer': {
      data.subjects[subjectId].questions[questionId].selectedAnswer = action.selectedAnswer;
      return { ...state };
    }

    case 'change': {
      if (action.subjectId !== subjectId || action.questionId !== questionId) {
        return {
          subjectId: action.subjectId,
          questionId: action.questionId,
        };
      } else return state;
    }

    case 'next': {
      const numberOFSubject = data.subjects.length;
      const numberOFQuestion = data.subjects[subjectId].questions.length;
      const newState = { ...state };

      if (questionId < numberOFQuestion - 1) newState.questionId++;
      else if (subjectId < numberOFSubject - 1) {
        newState.subjectId++;
        newState.questionId = 0;
      } else return state;

      return newState;
    }

    case 'previous': {
      const newState = { ...state };

      if (questionId > 0) newState.questionId--;
      else if (subjectId > 0) {
        newState.subjectId--;
        newState.questionId = data.subjects[newState.subjectId].questions.length - 1;
      } else return state;

      return newState;
    }

    case 'clear': {
      if (data.subjects[subjectId].questions[questionId].selectedAnswer !== -1) {
        data.subjects[subjectId].questions[questionId].selectedAnswer = -1;
        return { ...state };
      } else return state;
    }

    case 'mark': {
      data.subjects[subjectId].questions[questionId].isMarked =
        !data.subjects[subjectId].questions[questionId].isMarked;
      return { ...state };
    }

    default:
      break;
  }
};

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const curQuestion = data.subjects[state.subjectId].questions[state.questionId];
  const [isTestEnded, setIsTestEnded] = useState(false);
  const [timerId, setTimerId] = useState(0);

  useEffect(() => {
    document.addEventListener('keydown', (e) => {
      if (!e.target.name || e.target.name !== 'option') {
        switch (e.key) {
          case 'ArrowLeft':
            dispatch({ type: 'previous' });
            break;
          case 'ArrowRight':
            dispatch({ type: 'next' });
            break;
        }
      }
    });
  }, []);

  const getScore = () => {
    const score = [];

    data.subjects.forEach((subject, index) => {
      score[index] = {};
      score[index].title = subject.title;
      score[index].totalQuestions = subject.questions.length;

      score[index].correctQuestions = subject.questions.reduce(function (pre, cur) {
        if (cur.selectedAnswer === cur.correctAnswer) pre++;

        return pre;
      }, 0);
    });
    return score;
  };

  const endTest = () => {
    clearInterval(timerId);
    setIsTestEnded(true);
  };

  const answerQuestion = (ans) => {
    dispatch({
      type: 'answer',
      selectedAnswer: ans,
    });
  };

  const changeQuestion = (question) => {
    dispatch({
      type: 'change',
      subjectId: question.subjectId,
      questionId: question.id,
    });
  };

  return (
    <div className={styles.container}>
      {isTestEnded && <ScoreCard getScore={getScore} />}
      <Content
        curQuestion={curQuestion}
        answerQuestion={answerQuestion}
        previousQuestion={() => dispatch({ type: 'previous' })}
        clearQuestion={() => dispatch({ type: 'clear' })}
        markQuestion={() => dispatch({ type: 'mark' })}
        nextQuestion={() => dispatch({ type: 'next' })}
        testDuration={data.duration}
        endTest={endTest}
        setTimerId={setTimerId}
      />
      <Sidebar
        subjects={data.subjects}
        curQuestion={curQuestion}
        changeQuestion={changeQuestion}
        endTest={endTest}
      />
    </div>
  );
}

export default App;
