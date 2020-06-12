import React,{Component} from "react";
import Navbar from "./navbar";
import Header from "./header";
import About from "./about";
import Services from "./services";
import Works from "./works";
import Numbers from "./numbers";
import Contact from "./contact";
import Footer from "./footer";
import HeaderEnterprise from './headerEnterprise'
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

// O json do site é carregado no cabeçalho HTML
// const jsonSite = window.site
let jsonSite = window.site 
// getSite(jsonSite);

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
      <Loading />
      <Navbar readOnly={props.readOnly} navbar={jsonSite.navbar}/>
      <HeaderEnterprise readOnly={props.readOnly} headerEnterprise={jsonSite.headerEnterprise} />
      {/* <Header readOnly={props.readOnly} header={jsonSite.header} /> */}
      <About readOnly={props.readOnly} about={jsonSite.about} />
      <Services readOnly={props.readOnly} services={jsonSite.services} />
      <Works readOnly={props.readOnly} works={jsonSite.works} />
      <Numbers readOnly={props.readOnly} numbers={jsonSite.numbers} header={jsonSite.header}/>
      <Contact readOnly={props.readOnly} contact={jsonSite.contact} />
      <Footer readOnly={props.readOnly} />
    </div>
  );
}

class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route path="/edit">
            <Site />
          </Route>
          <Route path="/">
            <Site readOnly={true} />
          </Route>
        </Switch>
      </Router>
    );
  }
}

export default App;
