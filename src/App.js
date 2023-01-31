import React from "react";
import './App.css';
import {useState, useEffect} from "react";

function App() {
  const [breakCount, SetBreakCount] = useState(5);
  const [sessionCount, SetSessionCount] = useState(25);
  const [time, setTime] = useState("");
  const [running, setRunning] = useState(false);

  const SetBreakCountDecrement = () => {
    //decrementing value within break-length and ensuring breakCount state starts from 60 and not above it to avoid clicking without showing values
     SetBreakCount((previousBreakCount) => (previousBreakCount > 60 ? 60 - 1 : previousBreakCount - 1));

  }
  const SetBreakCountIncrement = () => {
    //incrementing value within break-length and ensuring breakCount state starts from 0 and not negative number to avoid Clicking without showing values
     SetBreakCount((previousBreakCount) => (previousBreakCount < 1 ? 1 + 1 : previousBreakCount + 1));

  }

  const SetSessionCountDecrement = () => {
     SetSessionCount((previousSessionCount) => (previousSessionCount > 60 ? 60 - 1 : previousSessionCount - 1));
  }

  const SetSessionCountIncrement = () => {
    SetSessionCount((previousSessionCount) => (previousSessionCount < 1 ? 1 + 1 : previousSessionCount + 1));
  }

  useEffect(() => {
    var interval=null;
    if(!running){
      interval = setInterval(() =>{
        setTime((previousTime ) => previousTime + 10);
      }, 10);
    } else if (running){
      clearInterval(interval);
    }
    return () => clearInterval(interval);

  }, [running]);

  let seconds = <span>{("0" + Math.floor((time / 60000) % 60)).slice(-2)}:</span>
  let minutes = <span>{("0" + Math.floor((time / 1000) % 60)).slice(-2)}:</span>



  return (
    <div className="App">
      <h1>25 + 5 Clock</h1>
      <div className="break-session-container">
      <div className="break-div">
        <h2 id="break-label">Break Length</h2>
        <div className="small-break-div">
        <span id="break-decrement" ><i class="fa-solid fa-arrow-down" onClick={SetBreakCountDecrement}></i></span>
        <div id="break-length">{breakCount < 1 ? 1 : breakCount > 60 ? 60 : breakCount}</div>
        <span id="break-increment"><i class="fa-solid fa-arrow-up" onClick={SetBreakCountIncrement}></i></span>
        </div>
      </div>
      <div className="session-div">
        <h2 id="session-label">Session Length</h2>
        <div className="small-session-div">
        <span id="session-decrement"><i class="fa-solid fa-arrow-down" onClick={SetSessionCountDecrement}></i></span>
        <div id="session-length">{sessionCount < 1 ? 1 : sessionCount > 60 ? 60 : sessionCount}</div>
        <span id="session-increment"><i class="fa-solid fa-arrow-up" onClick={SetSessionCountIncrement}></i></span>
        </div>
      </div>
      </div>
      <div className="timer">
        <h2 id="timer-label">Break</h2>
        <h3 id="time-left">{seconds}{minutes}</h3>
      </div>
      <div className="control-buttons">
        <span id="start-stop"><span class="material-symbols-outlined">
play_pause
</span></span>
        <span id="reset"><span class="material-symbols-outlined">
cached
</span></span>

      </div>

    </div>
  );
}

export default App;

