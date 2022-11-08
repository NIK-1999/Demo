import React, { useContext } from 'react';
import { CurQuestionContext } from '../App';
import styles from './Footer.module.css';

function Footer(props) {
  const { previousQuestion, clearQuestion, markQuestion, nextQuestion } = props;

  return (
    <div className={styles.container}>
      <button id='previousBtn' onClick={props.previousQuestion}>
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

      <button id={styles.nextBtn} onClick={props.nextQuestion}>
        Next <i className='fa-solid fa-circle-chevron-right' />
      </button>
    </div>
  );
}

export default Footer;
