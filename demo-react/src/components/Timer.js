import React, { useContext, useEffect, useState } from 'react';
import { TimerContext } from '../App';
import { EndTestContext } from '../App';

function Timer() {
  const [duration, setDuration] = useState(useContext(TimerContext));
  const { setTimerId, endTest } = useContext(EndTestContext);

  useEffect(() => {
    const tick = () => {
      setDuration((duration) => duration - 1);
    };

    setTimerId(setInterval(tick, 1000));
  }, []);

  useEffect(() => {
    if (duration <= 0) {
      endTest();
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

export default Timer;
