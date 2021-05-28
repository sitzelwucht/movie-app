import { Route, Switch, withRouter } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css';
import Landing from './components/Landing'
import NavBar from './components/NavBar';
import SingleMovie from './components/SingleMovie';


function App() {




  return (
    <>
   <div className="App d-flex mx-auto">
   <NavBar />
    <Switch>

      <Route exact path="/" render={() => {
        return <Landing />
      }} />

      <Route path="/movie/:id" render={(routeProps) => {
        return <SingleMovie 
          id={routeProps.match.params.id}
        />
      }} />

    </Switch>
   
     
      
    </div>
    </>
  );
}

export default withRouter(App);
