import React from 'react';
import Subject from './Subject';
import styles from './SubjectList.module.css';

function SubjectList(props) {
  const { subjects, ...other } = props;

  return (
    <div className={styles.container}>
      {subjects.map((subject, index) => {
        return <Subject key={index} subject={subject} {...other} />;
      })}
    </div>
  );
}

export default SubjectList;
