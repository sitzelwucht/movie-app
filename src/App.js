import { useState } from 'react'
import { Route, Switch, withRouter } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css';
import Landing from './components/Landing'
import NavBar from './components/NavBar';
import SingleMovie from './components/SingleMovie';
import SearchBar from './components/SearchBar';
import IntroLogo from './components/IntroLogo';
import Footer from './components/Footer'

function App() {


  return (
    <>
   <div className="main-container d-flex mx-auto w-75">


      {/* <Route exact path="/" render={() => {
        return <SearchBar />
      }} /> */}

      <IntroLogo />

      <SearchBar />

      <Route path="/movie/:id" render={(routeProps) => {
        return <SingleMovie 
          id={routeProps.match.params.id}
        />
      }} />


    </div>
    <Footer />
    </>
  );
}

export default withRouter(App);
