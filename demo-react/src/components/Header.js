import React from 'react';
import styles from './Header.module.css';
import Timer from './Timer';

function Header(props) {
  return (
    <div className={styles.container}>
      <h2>Let's Quiz!</h2>
      <Timer />
    </div>
  );
}

export default Header;
