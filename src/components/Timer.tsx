import "./Timer.css";
import ProgressBar from "react-bootstrap/ProgressBar";
import { useState, useEffect } from "react";

function Timer(props: {
  countdown: number;
  onFinish: Function;
  restart: boolean;
  setRestart: Function;
}) {
  const { countdown, onFinish, restart, setRestart } = props;
  const [timeProgress, setTimeProgress] = useState(100);
  const [time, setTime] = useState(Date.now());
  useEffect(() => {
    if (restart) {
      setTimeProgress(100);
      setRestart(false);
    }
    if (!restart && timeProgress <= 0) {
      onFinish();
      return;
    }
    const interval = setInterval(() => {
      setTime(Date.now());
      setTimeProgress((previousState) => previousState - 100 / countdown);
    }, 1000);
    return () => {
      clearInterval(interval);
    };
  }, [timeProgress, countdown, onFinish, restart, setRestart]);
  return <ProgressBar now={timeProgress} />;
}

export default Timer;
