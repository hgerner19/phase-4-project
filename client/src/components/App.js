import React, { useEffect, useState } from "react";
import { Switch, Route } from "react-router-dom";

import Home from "./Home.js"
import NavBar from "./NavBar.js"

function App() {
  // Code goes here!
  return (
    <>
      <NavBar />
      <Home />
    </>
  )
}

export default App;
