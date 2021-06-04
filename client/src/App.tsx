import React from "react";
import "./App.css";
import { CalendarBox } from "./Containers/CalendarBox/CalendarBox";
import { EventBox } from "./Containers/EventBox/EventBox";

function App() {
  return (
    <div className="App">
      <CalendarBox />
      <EventBox />
    </div>
  );
}

export default App;
