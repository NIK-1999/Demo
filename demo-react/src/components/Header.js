import React from 'react';
import styles from './Header.module.css';
import CountDownTimer from './CountDownTimer';

function Header(props) {
  return (
    <div className={styles.container}>
      <h2>Let's Quiz!</h2>
      <CountDownTimer
        onTimeUp={props.endTest}
        setTimerId={props.setTimerId}
        duration={props.testDuration}
      />
    </div>
  );
}

export default Header;
