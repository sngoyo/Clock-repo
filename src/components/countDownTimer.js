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
  const [timeColor, setTimeColor] = useState("false");



  // Get time a head in Milliseconds
  var  countDownSessionCount = new Date().getTime() + timeInMilliSeconds;


  const setBreakCountDecrement = () => {
    if (!isRunning){
       ///To prevent break length from having value below 1
      if (breakCount > 1){
    setBreakCount((prev)=> prev - 1);
     }
    }
  }

  const setBreakCountIncrement = () => {
    if (!isRunning ){
      if(breakCount < 60){
        //To prevent break length from having value more than 60
    setBreakCount((prev) => prev + 1);
      }
    }
  }

  const setSessionCountDecrement = () => {
     if(!isRunning){
       //The condition below is to prevent session length from having value below 1
       if(sessionCount > 1 ){
       setSessionCount((prev) => prev - 1);
     }
    }
  }

  const setSessionCountIncrement = () => {
    if (!isRunning){
        //To prevent session length from having value more than 60
      if(sessionCount < 60 ){
    setSessionCount((prev) => prev + 1);
    }
  }
}


//This useEffect hook Count down the milliseconds that is passed
 //to the function updateRemainingTime andreturn minutes and seconds
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
         setTimeColor("false");
        if (timerType === "Session"){
          setTimerType('Break');
          setTimeInMilliSeconds(breakCount * 1000 * 60);
        } else {
          setTimerType("Session");
          setTimeInMilliSeconds(sessionCount * 1000 * 60);
        }
     }
     if (remainingTimeUpdate.minutes === 1 && remainingTimeUpdate.seconds === 0){
      if (timeColor === "false"){
        setTimeColor("true");
      }
    }
  };

  //UseEffect hook to update  the time when decrementing/incrementing session/break length
  useEffect(() => {
    if (!isRunning){
      setTimeInMilliSeconds(sessionCount * 1000 * 60);
      setGetRemainingTime({
        minutes: sessionCount > 60? 60 : sessionCount,
        seconds: 0
      });
    }
  }, [sessionCount]);


 //start-stop timer
 const handleStartStop = () => {
    if(isRunning){
      setIsRunning(false)
    } else {
      setIsRunning(true)
    }
 };


  const handleReset = () => {
    if (isRunning){
      setIsRunning(false)
      setBreakCount(5);
      setSessionCount(25);
      setGetRemainingTime({
        minutes: 25,
        seconds: 0
      });
      setTimerType("Session");
     setTimeInMilliSeconds(defaultRemainingTime.minutes * 1000 * 60);
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
        <h2 id="timer-label" style= { timeColor === "true" ? {color:"rgb(190, 19, 17)"} : {}}>{timerType}</h2>
        <h3 id="time-left"><span className="time" style= { timeColor === "true" ? {color:"rgb(190, 19, 17)"} : {}}>{getRemainingTime.minutes < 10 ? "0" + getRemainingTime.minutes : getRemainingTime.minutes}:</span>
        <span className="time" style= { timeColor === "true" ? {color: "rgb(190, 19, 17)" } : {}}>{getRemainingTime.seconds < 10 ? "0" + getRemainingTime.seconds : getRemainingTime.seconds}</span></h3>
      </div>
      <div className="control-buttons">
        <span id="start-stop" name="controlButton" onClick={handleStartStop}>
          <span className="material-symbols-outlined">
          play_pause
          </span>
       </span>
        <span id="reset" onClick={handleReset}>
          <span className="material-symbols-outlined">cached
          </span>
        </span>

      </div>
         <p className="title"> Coded by </p>
         <p className="designer"> Salim Ngoyo </p>
      </div>

    );
}

export default CountDownTimer;