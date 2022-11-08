import React, { useEffect, useRef, useState } from 'react';

function CountDownTimer(props) {
  const [duration, setDuration] = useState(props.duration);
  const timerId = useRef();

  useEffect(() => {
    const tick = () => {
      setDuration((duration) => duration - 1);
    };

    timerId.current = setInterval(tick, 1000);
    props.setTimerId(timerId.current);

    return () => {
      clearInterval(timerId.current);
    };
  }, []);

  useEffect(() => {
    if (duration <= 0) {
      props.onTimeUp();
    }
  }, [duration]);

  const remainingTime = (() => {
    let remainingDuration = duration;
    const time = {};

    time.hours = Math.floor(remainingDuration / 3600);
    remainingDuration %= 3600;
    time.minutes = Math.floor(remainingDuration / 60);
    remainingDuration %= 60;
    time.seconds = remainingDuration;

    const h = time.hours < 10 ? '0' + time.hours : time.hours;
    const m = time.minutes < 10 ? '0' + time.minutes : time.minutes;
    const s = time.seconds < 10 ? '0' + time.seconds : time.seconds;

    return h + ' : ' + m + ' : ' + s;
  })();

  return <p>{remainingTime}</p>;
}

export default CountDownTimer;
