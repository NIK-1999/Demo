import React, { useContext } from 'react';
import { CurQuestionContext } from '../App';
import styles from './Footer.module.css';

function Footer() {
  const curQuestionContext = useContext(CurQuestionContext);

  return (
    <div className={styles.container}>
      <button
        id='previousBtn'
        onClick={() => curQuestionContext.dispatch({ type: 'previous' })}>
        <i className='fa-solid fa-circle-chevron-left' /> Previous
      </button>
      <button
        id='clearBtn'
        onClick={() => curQuestionContext.dispatch({ type: 'clear' })}>
        Clear
      </button>
      <button
        id='markBtn'
        onClick={() => curQuestionContext.dispatch({ type: 'mark' })}>
        {curQuestionContext.curQuestion.isMarked ? (
          <i className='fa-solid fa-bookmark' style={{ color: '#e68a00' }} />
        ) : (
          <i className='fa-regular fa-bookmark' />
        )}
        {curQuestionContext.curQuestion.isMarked ? ' Marked' : ' Mark'}
      </button>
      <button
        id={styles.nextBtn}
        onClick={() => curQuestionContext.dispatch({ type: 'next' })}>
        Next <i className='fa-solid fa-circle-chevron-right' />
      </button>
    </div>
  );
}

export default Footer;
