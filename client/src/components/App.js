import React, { useEffect, useState } from "react";
import { Switch, Route } from "react-router-dom";

import NavBar from "./NavBar.js"
import Home from "./Home.js"
import Menu from "./Menu.js"
import Login from "./Login.js"
import CreateAccount from "./CreateAccount.js";
import AboutUs from "./AboutUs.js";
import Order from "./Order.js";
import OrderCheckout from "./OrderCheckout.js"

function App() {
  // Code goes here!
  return (
    <>
      <NavBar />
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route exact path="/menu">
          <Menu />
        </Route>
        <Route exact path="/login">
          <Login />
        </Route>
        <Route exact path="/create-account">
          <CreateAccount />
        </Route>
        <Route exact path="/order">
          <Order />
        </Route>
        <Route exact path="/order/checkout">
          <OrderCheckout />
        </Route>
        <Route exact path="/about-us">
          <AboutUs />
        </Route>
      </Switch>
    </>
  )
}

export default App;
