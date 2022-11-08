import React from 'react';
import styles from './SubjectHeader.module.css';

function SubjectHeader(props) {
  return (
    <div className={styles.container}>
      <h3>{props.title}</h3>
      <small>Attemp All</small>
    </div>
  );
}

export default SubjectHeader;
