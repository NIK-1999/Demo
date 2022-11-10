import React from 'react';
import PropTypes from 'prop-types';
import Subject from './subject/Subject';
import styles from './SubjectList.module.css';

function SubjectList(props) {
  return (
    <div className={styles.container}>
      {props.subjects.map((subject, index) => {
        return (
          <Subject
            key={index}
            subject={subject}
            curQuestion={props.curQuestion}
            changeQuestion={props.changeQuestion}
          />
        );
      })}
    </div>
  );
}

SubjectList.propTypes = {
  subjects: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      questions: PropTypes.arrayOf(
        PropTypes.shape({
          question: PropTypes.string.isRequired,
          answers: PropTypes.arrayOf(PropTypes.string).isRequired,
          correctAnswer: PropTypes.number.isRequired,
        })
      ),
    })
  ),
  curQuestion: PropTypes.shape({
    question: PropTypes.string.isRequired,
    answers: PropTypes.arrayOf(PropTypes.string).isRequired,
    correctAnswer: PropTypes.number.isRequired,
  }),
  changeQuestion: PropTypes.func,
};

SubjectList.defaultProps = {
  subjects: [],
  curQuestion: {},
  changeQuestion: () => {},
};

export default SubjectList;
