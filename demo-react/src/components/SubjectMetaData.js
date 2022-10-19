import React from 'react';
import styles from './SubjectMetaData.module.css';

function SubjectMetaData(props) {
  const { answeredQuestion, markedQuestion, unAnsweredQuestion } = props.metaData;
  return (
    <ul className={styles.container}>
      <li>
        <i className='fa-solid fa-circle' style={{ color: '#737373' }} />
        {` ${answeredQuestion} answered`}
      </li>
      <li>
        <i className='fa-solid fa-circle' style={{ color: '#e68a00' }} />
        {` ${markedQuestion} marked`}
      </li>
      <li>
        <i className='fa-regular fa-circle' />
        {` ${unAnsweredQuestion} unanswered`}
      </li>
    </ul>
  );
}

export default SubjectMetaData;
