import React from "react";
import { useState, useEffect, useRef } from "react";
import {FormatTime} from "/home/salim/Documents/REACT_APPs/clock-app/src/components/leftTime.js";
const beepSound = require("/home/salim/Documents/REACT_APPs/clock-app/src/beep_alarm.mp3");


const defaultRemainingTime = {
  minutes: 25,
  seconds: 0
}

function CountDownTimer() {
  const [breakCount, setBreakCount] = useState(5);
  const [sessionCount, setSessionCount] = useState(25);
  const [isRunning, setIsRunning] = useState(true);
  const [getRemainingTime, setGetRemainingTime] = useState(defaultRemainingTime);
  const [timerType, setTimerType] = useState("Session");
  const [timeInMilliSeconds, setTimeInMilliSeconds] = useState(sessionCount * 1000 * 60);
  const audioRef = useRef(null);

  // Get time a head in Milliseconds
  var  countDownSessionCount = new Date().getTime() + timeInMilliSeconds;


  const setBreakCountDecrement = () => {
    //decrementing value within break-length and ensuring breakCount state starts from 60 and not above it to avoid clicking without showing values
    if (!isRunning){
    setBreakCount(breakCount > 60 ? 60 - 1 : breakCount - 1);
    }
  }//
  const setBreakCountIncrement = () => {
    //incrementing value within break-length and ensuring breakCount state starts from 0 and not negative number to avoid Clicking without showing values
    if (!isRunning){
    setBreakCount(breakCount < 1 ? 1 + 1 : breakCount + 1);
    }
  }

  const setSessionCountDecrement = () => {
     if(!isRunning){
     setSessionCount(sessionCount > 60 ? 60 - 1 : sessionCount - 1);
     getRemainingTime.minutes = (sessionCount -1);
     getRemainingTime.seconds = 0;
     }
    }

  const setSessionCountIncrement = () => {
    if (!isRunning){
    setSessionCount(sessionCount < 1 ? 1 + 1 : sessionCount + 1);
    getRemainingTime.minutes = (sessionCount + 1);
    getRemainingTime.seconds = 0;
    }
  }


  useEffect(() => {
    var interval = null;
    if (isRunning){
      interval = setInterval(()=>{
        updateRemainingTime(countDownSessionCount);
      }, 1000)
    } else {
        clearInterval(interval)
      }
    return () => clearInterval(interval);
   }, [isRunning, breakCount, sessionCount, timerType]);


  function updateRemainingTime (countdowntime) {
    var remainingTimeUpdate = FormatTime(countdowntime);
       setGetRemainingTime(remainingTimeUpdate);
      if (remainingTimeUpdate.minutes === 0 && remainingTimeUpdate.seconds === 0){
         audioRef.current.play();
        if (timerType === "Session"){
          setTimerType('Break')
          setTimeInMilliSeconds(breakCount * 1000 * 60);
        } else {
          setTimerType("Session");
          setTimeInMilliSeconds(sessionCount * 1000 * 60);
        }
    }
  };

//console.log(getRemainingTime.minutes + " " + getRemainingTime.seconds);

 //start-stop timer and reset
 const handleStartStop = () => {
   if (!isRunning && timerType === "Session"){
     setIsRunning(true);
     setTimeInMilliSeconds(sessionCount * 1000 * 60)
   } else if (!isRunning && timerType === "Break"){
     setIsRunning(true);
     setTimeInMilliSeconds(breakCount * 1000 * 60)
   } else {
     setIsRunning(false)
   }
 }


  const handleReset = () => {
    if (isRunning){
      setIsRunning(false)
      setBreakCount(5);
      setSessionCount(25);
      setGetRemainingTime(defaultRemainingTime);
      setTimerType("Session");
    }

  }

    return (
      <div>
        <h1>25 + 5 Clock</h1>
      <div className="break-session-container">
      <audio id="beep" ref={audioRef} volume={1}
      src={beepSound}  type="audio/mpeg">
        </audio>
      <div className="break-div">
        <h2 id="break-label">Break Length</h2>
        <div className="small-break-div">
        <span id="break-decrement" ><i className="fa-solid fa-arrow-down" onClick={setBreakCountDecrement}></i></span>
        <div id="break-length">{breakCount < 1 ? 1 : breakCount > 60 ? 60 : breakCount}</div>
        <span id="break-increment"><i className="fa-solid fa-arrow-up" onClick={setBreakCountIncrement}></i></span>
      </div>
      </div>
      <div className="session-div">
        <h2 id="session-label">Session Length</h2>
        <div className="small-session-div">
        <span id="session-decrement"><i className="fa-solid fa-arrow-down" onClick={setSessionCountDecrement}></i></span>
        <div id="session-length">{sessionCount < 1 ? 1 : sessionCount > 60 ? 60 : sessionCount}</div>
        <span id="session-increment"><i className="fa-solid fa-arrow-up" onClick={setSessionCountIncrement}></i></span>
        </div>
      </div>
      </div>
      <div className="timer">
        <h2 id="timer-label">{timerType}</h2>
        <h3 id="time-left"><span>{getRemainingTime.minutes < 10 ? "0" + getRemainingTime.minutes : getRemainingTime.minutes}:</span><span>{getRemainingTime.seconds < 10 ? "0" + getRemainingTime.seconds : getRemainingTime.seconds}</span></h3>
      </div>
      <div className="control-buttons">
        <span id="start-stop" name="controlButton" onClick={handleStartStop}><span className="material-symbols-outlined">
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