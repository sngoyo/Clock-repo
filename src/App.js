import React from "react";
import './App.css';

function App() {
  return (
    <div className="App">
      <h1>25 + 5 Clock</h1>
      <div className="break-session-container">
      <div className="break-div">
        <h2 id="break-label">Break Length</h2>
        <div className="small-break-div">
        <span id="break-decrement" ><i class="fa-solid fa-arrow-down"></i></span>
        <div id="break-length">{5}</div>
        <span id="break-increment"><i class="fa-solid fa-arrow-up"></i></span>
        </div>
      </div>
      <div className="session-div">
        <h2 id="session-label">Session Length</h2>
        <div className="small-session-div">
        <span id="session-decrement"><i class="fa-solid fa-arrow-down"></i></span>
        <div id="session-length">{25}</div>
        <span id="session-increment"><i class="fa-solid fa-arrow-up"></i></span>
        </div>
      </div>
      </div>
      <div className="timer">
        <h2 id="timer-label">Break</h2>
        <h3 id="time-left">{25}:{0}{0}</h3>
      </div>
      <div className="control-buttons">
        <span id="start-stop"><i class="fa-solid fa-play-pause"></i></span>
        <span id="reset"><i class="fa-regular fa-rotate"></i></span>

      </div>

    </div>
  );
}

export default App;
