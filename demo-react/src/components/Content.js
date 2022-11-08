import React from 'react';
import styles from './Content.module.css';
import Footer from './Footer';
import Header from './Header';
import Question from './Question';

function Content(props) {
  const { curQuestion, answerQuestion, testDuration, endTest, setTimerId, ...other } = props;

  return (
    <div className={styles.container}>
      <Header testDuration={testDuration} endTest={endTest} setTimerId={setTimerId} />
      <Question question={curQuestion} answerQuestion={answerQuestion} />
      <Footer isCurQuestionMarked={curQuestion.isMarked} {...other} />
    </div>
  );
}

export default Content;
