import React from "react";
import "./App.css";
import Home from "./Components/Home";
import {Routes, Route, BrowserRouter } from "react-router-dom";
import Newtask from "./Components/Newtask";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/newtask" element={<Newtask/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
