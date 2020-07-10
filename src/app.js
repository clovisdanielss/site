import React, { Component } from "react";
import Navbar from "./components/navbar";
import Header from "./components/header";
import About from "./components/about";
import Services from "./components/services";
import Works from "./components/works";
import Numbers from "./components/numbers";
import Contact from "./components/contact";
import Footer from "./components/footer";
import HeaderEnterprise from "./components/headerEnterprise";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
  Link,
} from "react-router-dom";
import Login from "./components/login";
import UpdateAccount from "./components/updateAccount";
import { GlobalStateContext } from "./contexts";
import Modal from "react-modal";
Modal.setAppElement("#root");

let jsonSite = window.site;

const Loading = () => {
  return (
    <div className="loading">
      <div className="load-circle"></div>
    </div>
  );
};

const Site = (props) => {
  return (
    <div className="">
      {/* <Loading /> */}
      <Navbar readOnly={props.readOnly} navbar={jsonSite.navbar} />
      <HeaderEnterprise
        readOnly={props.readOnly}
        headerEnterprise={jsonSite.headerEnterprise}
      />
      {/* <Header readOnly={props.readOnly} header={jsonSite.header} /> */}
      <About readOnly={props.readOnly} about={jsonSite.about} />
      <Services readOnly={props.readOnly} services={jsonSite.services} />
      <Works readOnly={props.readOnly} works={jsonSite.works} />
      <Numbers
        readOnly={props.readOnly}
        numbers={jsonSite.numbers}
        header={jsonSite.headerEnterprise}
      />
      <Contact readOnly={props.readOnly} contact={jsonSite.contact} />
      <Footer readOnly={props.readOnly} />
      {props.readOnly ? null : (
        <div className="icon-config">
          <Link className="nav-link" to="/update">
            <span className="icon">
              <i className="fas fa-cogs my-icon"></i>
            </span>
          </Link>
        </div>
      )}
    </div>
  );
};

const PrivateRoute = ({ children, ...rest }) => {
  const context = React.useContext(GlobalStateContext);
  console.log(context);
  return (
    <Route
      {...rest}
      render={({ location }) =>
        context.isAuthenticated ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: location },
            }}
          ></Redirect>
        )
      }
    ></Route>
  );
};

class App extends Component {
  static contextType = GlobalStateContext;

  render() {
    return (
      <Router>
        <Switch>
          <PrivateRoute path="/update">
            <UpdateAccount></UpdateAccount>
          </PrivateRoute>
          <Route path="/login">
            <Login></Login>
          </Route>
          <PrivateRoute path="/edit">
            <Site />
          </PrivateRoute>
          <Route path="/">
            <Site readOnly={true} />
          </Route>
        </Switch>
      </Router>
    );
  }
}

export default App;
