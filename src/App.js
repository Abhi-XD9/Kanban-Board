import React from "react";
import "./App.css";
import Context from "./Components/Context";
import Home from "./Components/Home";
import {Routes, Route, HashRouter  } from "react-router-dom";
import Newtask from "./Components/Newtask";
import { PrimeReactProvider } from 'primereact/api';
import './responsive.css';

import "primereact/resources/themes/lara-light-cyan/theme.css";

function App() {
  return (
   <PrimeReactProvider>
     <Context>
      <HashRouter>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/newtask" element={<Newtask/>}/>
        </Routes>
      </HashRouter>
    </Context>
   </PrimeReactProvider>
  );
}

export default App;
