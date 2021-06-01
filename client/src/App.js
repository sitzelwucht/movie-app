import { useEffect, useState } from 'react'
import { Route, withRouter } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css';
import Landing from './components/Landing'
import SingleMovie from './components/SingleMovie';
import SingleSeries from './components/SingleSeries'
import Person from './components/Person'
import SearchBar from './components/SearchBar';
import IntroLogo from './components/IntroLogo';
import Footer from './components/Footer'

function App() {
  const [minimize, setMinimize] = useState(false)


  const handleMinimize = () => {
    setMinimize(true)
  }


  useEffect(() => {
    document.addEventListener('keydown', setMinimize)

    return () => {
      document.removeEventListener('keydown', setMinimize)
    }
  })


  return (
    <>
   {/* <div className="mx-auto w-75 d-flex"> */}
    <div className="page">
      <Landing 
      mini={minimize} 
      handleMinimize={handleMinimize}
        
      />

      {/* <Route path="/movie/:id" render={(routeProps) => {
        return <SingleMovie 
          id={routeProps.match.params.id}
        />
      }} />

      <Route path="/people/:id" render={(routeProps) => {
        return <Person 
          id={routeProps.match.params.id}
        />
      }} />

      <Route path="/series/:id" render={(routeProps) => {
        return <SingleSeries 
          id={routeProps.match.params.id}
        />
      }} /> */}


    </div>
    <Footer />
    </>
  );
}

export default withRouter(App);
