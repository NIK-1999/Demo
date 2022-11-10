import React from 'react';
import PropTypes from 'prop-types';
import styles from './Header.module.css';
import CountDownTimer from './count_down_timer/CountDownTimer';

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

Header.propTypes = {
  testDuration: PropTypes.number.isRequired,
  endTest: PropTypes.func,
  setTimerId: PropTypes.func,
};

export default Header;
