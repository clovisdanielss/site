import React from "react";
import Navbar from "./navbar";
import Header from "./header";
import About from "./about";
import Services from "./services";
import Works from "./works";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
function Loading() {
  return (
    <div className="loading">
      <div className="load-circle"></div>
    </div>
  );
}

function Site(props) {
  return (
    <div className="">
      <Loading  />
      <Navbar  />
      <Header readOnly={props.readOnly} />
      <About readOnly={props.readOnly} />
      <Services readOnly={props.readOnly} />
      <Works readOnly={props.readOnly} />
    </div>
  );
}

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/edit">
          <Site />
        </Route>
        <Route path="/">
          <Site readOnly={true}/>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
