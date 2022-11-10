import React from 'react';
import PropTypes from 'prop-types';
import QuestionList from './question_list/QuestionList';
import SubjectMetaData from './subject_meta_data/SubjectMetaData';
import styles from './Subject.module.css';

function Subject(props) {
  const { title, questions } = props.subject;

  const getAnsweredQuestion = () => {
    return questions.reduce((pre, cur) => {
      if (cur.selectedAnswer !== -1) pre++;

      return pre;
    }, 0);
  };

  const getMarkedQuestion = () => {
    return questions.reduce(function (pre, cur) {
      if (cur.isMarked) pre++;

      return pre;
    }, 0);
  };

  const getUnAnsweredQuestion = () => {
    return questions.length - getAnsweredQuestion();
  };

  const metaData = (() => {
    return {
      answeredQuestion: getAnsweredQuestion(),
      markedQuestion: getMarkedQuestion(),
      unAnsweredQuestion: getUnAnsweredQuestion(),
    };
  })();

  return (
    <section>
      <div className={styles.container}>
        <h3>{title}</h3>
        <small>Attemp All</small>
      </div>
      <SubjectMetaData metaData={metaData} />
      <QuestionList
        questions={questions}
        curQuestion={props.curQuestion}
        changeQuestion={props.changeQuestion}
      />
    </section>
  );
}

Subject.propTypes = {
  subject: PropTypes.shape({
    title: PropTypes.string.isRequired,
    questions: PropTypes.arrayOf(
      PropTypes.shape({
        question: PropTypes.string.isRequired,
        answers: PropTypes.arrayOf(PropTypes.string).isRequired,
        correctAnswer: PropTypes.number.isRequired,
      })
    ),
  }),
  curQuestion: PropTypes.shape({
    question: PropTypes.string.isRequired,
    answers: PropTypes.arrayOf(PropTypes.string).isRequired,
    correctAnswer: PropTypes.number.isRequired,
  }),
  changeQuestion: PropTypes.func,
};

Subject.defaultProps = {
  subject: {},
  curQuestion: {},
  changeQuestion: () => {},
};

export default Subject;
