import React, { useEffect, useState } from "react";
import { Switch, Route } from "react-router-dom";

import NavBar from "./NavBar.js"
import Home from "./Home.js"
import Menu from "./Menu.js"
import Account from "./Account.js"
import CreateAccount from "./CreateAccount.js";
import MyAccount from "./MyAccount.js";
import Order from "./Order.js";
import OrderCheckout from "./OrderCheckout.js"

function App() {

  const [user, setUser] = useState({
    "first_name": "",
    "last_name": "",
    "email": "",
    "address": "",

  })

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
        <Route exact path="/account">
          <Account />
        </Route>
        <Route exact path="/my-account">
          <MyAccount />
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
      </Switch>
    </>
  )
}

export default App;
