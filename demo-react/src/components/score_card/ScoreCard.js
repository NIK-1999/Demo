import React from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import styles from './ScoreCard.module.css';
import { computeScore } from './helper';

function ScoreCard(props) {
  let overallCorrectQuestions = 0;
  let overallQuections = 0;
  const score = computeScore(props.subjects);
  return ReactDOM.createPortal(
    <div className={styles.container}>
      <div>
        <h2>Score Card</h2>
        {score.map((item, index) => {
          overallCorrectQuestions += item.correctQuestions;
          overallQuections += item.totalQuestions;

          return (
            <section key={index}>
              <p>{item.title}</p>
              <span>{`${item.correctQuestions}/${item.totalQuestions}`}</span>
            </section>
          );
        })}
        <hr />
        <section>
          <p>Total</p>
          <span>{`${overallCorrectQuestions}/${overallQuections}`}</span>
        </section>
      </div>
    </div>,
    document.getElementById('result')
  );
}

ScoreCard.propTypes = {
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
};

ScoreCard.defaultProps = {
  subjects: [],
};

export default ScoreCard;
