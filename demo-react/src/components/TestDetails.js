import React, { useContext } from 'react';
import { EndTestContext } from '../App';
import styles from './TestDetails.module.css';

function TestDetails() {
  const { endTest } = useContext(EndTestContext);

  return (
    <div className={styles.container}>
      <h4>Mock test-1</h4>
      <button id='endTestBtn' onClick={endTest}>
        End Test
      </button>
    </div>
  );
}

export default TestDetails;
