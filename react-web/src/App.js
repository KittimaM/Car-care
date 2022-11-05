import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Login from "./Layout/Customer/Login";
import Home from "./Layout/Home";
import Navbar from "./Layout/Navbar/Navbar";
function App() {
  return (
    <Router>
      <Navbar />
      <Switch>
        <Route path="/login" exact><Login /></Route>
        <Route path="/" exact><Home /></Route>
        <Route path="/signup"></Route>
      </Switch>
    </Router>
  );
}

export default App;
