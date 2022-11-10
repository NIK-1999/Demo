import React from 'react';
import PropTypes from 'prop-types';
import styles from './Footer.module.css';

function Footer(props) {
  const moveToPreviousQuestion = () => {
    const state = props.state;

    let subjectId = state.subjectId;
    let questionId = state.questionId;

    if (questionId > 0) questionId--;
    else if (subjectId > 0) {
      subjectId--;
      questionId = state.subjects[subjectId].questions.length - 1;
    }

    props.changeQuestion(subjectId, questionId);
  };

  const moveToNextQuestion = () => {
    const state = props.state;
    let subjectId = state.subjectId;
    let questionId = state.questionId;

    const numberOFSubjects = state.subjects.length;
    const numberOFQuestions = state.subjects[subjectId].questions.length;

    if (questionId < numberOFQuestions - 1) questionId++;
    else if (subjectId < numberOFSubjects - 1) {
      subjectId++;
      questionId = 0;
    }

    props.changeQuestion(subjectId, questionId);
  };

  return (
    <div className={styles.container}>
      <button id='previousBtn' onClick={moveToPreviousQuestion}>
        <i className='fa-solid fa-circle-chevron-left' /> Previous
      </button>

      <button id='clearBtn' onClick={props.clearQuestion}>
        Clear
      </button>

      <button id='markBtn' onClick={props.markQuestion}>
        {props.isCurQuestionMarked ? (
          <i className='fa-solid fa-bookmark' style={{ color: '#e68a00' }} />
        ) : (
          <i className='fa-regular fa-bookmark' />
        )}
        {props.isCurQuestionMarked ? ' Marked' : ' Mark'}
      </button>

      <button id={styles.nextBtn} onClick={moveToNextQuestion}>
        Next <i className='fa-solid fa-circle-chevron-right' />
      </button>
    </div>
  );
}

Footer.propTypes = {
  state: PropTypes.exact({
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
    subjectId: PropTypes.number.isRequired,
    questionId: PropTypes.number.isRequired,
  }),
  changeQuestion: PropTypes.func.isRequired,
  clearQuestion: PropTypes.func.isRequired,
  markQuestion: PropTypes.func.isRequired,
};

Footer.defaultProps = {
  state: {},
  changeQuestion: () => {},
  clearQuestion: () => {},
  markQuestion: () => {},
};

export default Footer;
