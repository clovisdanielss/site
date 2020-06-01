import React from 'react';
import Navbar from './navbar'
import Header from './header'
import About from './about'
import Services from './services'

function Loading(){
  return(
    <div className="loading">
            <div className="load-circle">
            </div>
      </div>
  )
}

function App() {
  return (
    <div className="">
      <Loading />
      <Navbar />
      <Header />
      <About />
      <Services />
    </div>
  );
}

export default App;
