import React from "react";
import './App.css';
import {useState} from "react";
import CountDownTimer from "./components/countDownTimer.js";

function App() {

  return (
    <div className="App">
     <CountDownTimer time={parseInt(25)}/>

    </div>
  );
}

export default App;


