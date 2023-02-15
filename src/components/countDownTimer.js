import React from "react";
import { useState, useEffect } from "react";
import {FormatTime} from "/home/salim/Documents/REACT_APPs/clock-app/src/components/leftTime.js";

const defaultRemainingTime = {
  minutes: "25",
  seconds: "00"
}

function CountDownTimer() {
  const [breakCount, SetBreakCount] = useState(5);
  const [sessionCount, SetSessionCount] = useState(25);
  const [running, setRunning] = useState(false);
  const [getRemainingTime, setGetRemainingTime] = useState(defaultRemainingTime);

  const timeInMilliSeconds = sessionCount * 1000 * 60;;
  //get time a head in milliseconds;
  const countDown = new Date().getTime() + timeInMilliSeconds


  const SetBreakCountDecrement = () => {
    //decrementing value within break-length and ensuring breakCount state starts from 60 and not above it to avoid clicking without showing values
     SetBreakCount((previousBreakCount) => (previousBreakCount > 60 ? 60 - 1 : previousBreakCount - 1));

  }//
  const SetBreakCountIncrement = () => {
    //incrementing value within break-length and ensuring breakCount state starts from 0 and not negative number to avoid Clicking without showing values
     SetBreakCount((previousBreakCount) => (previousBreakCount < 1 ? 1 + 1 : previousBreakCount + 1));

  }

  const SetSessionCountDecrement = () => {
     if(running){
     SetSessionCount(sessionCount > 60 ? 60 - 1 : sessionCount - 1);
     getRemainingTime.minutes = (sessionCount -1).toString();
     getRemainingTime.seconds = "00";
     }
    }

  const SetSessionCountIncrement = () => {
    if (running){
    SetSessionCount(sessionCount < 1 ? 1 + 1 : sessionCount + 1);
    getRemainingTime.minutes = (sessionCount+1).toString();
    getRemainingTime.seconds = "00"
    }

  }

  useEffect(() => {
    var interval = null;
    if (!running){
    interval = setInterval(()=>{
      updateRemainingTime(countDown)
    }, 1000)
   } else {
        clearInterval(interval)
      }
    return () => clearInterval(interval);
   }, [running]);

  const initiateTimer = () => {
     if (!running) {
       setRunning(true)
     }else {
       setRunning(false)

     }
  }

  function updateRemainingTime (countdowntime) {
    setGetRemainingTime(FormatTime(countdowntime))
  };

  const handleReset = () => {
    setRunning(false);
    SetBreakCount(5);
    SetSessionCount(25);
    setGetRemainingTime(defaultRemainingTime);

  }

    return (
      <div>

        <h1>25 + 5 Clock</h1>
      <div className="break-session-container">
      <div className="break-div">
        <h2 id="break-label">Break Length</h2>
        <div className="small-break-div">
        <span id="break-decrement" ><i className="fa-solid fa-arrow-down" onClick={SetBreakCountDecrement}></i></span>
        <div id="break-length">{breakCount < 1 ? 1 : breakCount > 60 ? 60 : breakCount}</div>
        <span id="break-increment"><i className="fa-solid fa-arrow-up" onClick={SetBreakCountIncrement}></i></span>
        </div>
      </div>
      <div className="session-div">
        <h2 id="session-label">Session Length</h2>
        <div className="small-session-div">
        <span id="session-decrement"><i className="fa-solid fa-arrow-down" onClick={SetSessionCountDecrement}></i></span>
        <div id="session-length">{sessionCount < 1 ? 1 : sessionCount > 60 ? 60 : sessionCount}</div>
        <span id="session-increment"><i className="fa-solid fa-arrow-up" onClick={SetSessionCountIncrement}></i></span>
        </div>
      </div>
      </div>
      <div className="timer">
        <h2 id="timer-label">Break</h2>
        <h3 id="time-left"><span>{getRemainingTime.minutes}:</span><span>{getRemainingTime.seconds}</span></h3>
      </div>
      <div className="control-buttons">
        <span id="start-stop" onClick={initiateTimer}><span className="material-symbols-outlined">
play_pause
</span></span>
        <span id="reset" onClick={handleReset}><span className="material-symbols-outlined">
cached
</span></span>

      </div>
      </div>

    );
}

export default CountDownTimer;