import React from 'react';
import styles from './TestDetails.module.css';

function TestDetails(props) {
  return (
    <div className={styles.container}>
      <h4>Mock test-1</h4>
      <button id='endTestBtn' onClick={props.endTest}>
        End Test
      </button>
    </div>
  );
}

export default TestDetails;
