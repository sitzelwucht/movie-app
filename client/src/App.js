import { useEffect, useRef, useState } from 'react'
import { Route, withRouter, Switch } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css';
import axios from 'axios'
import config from './config'
import Footer from './components/Footer'
import IntroLogo from './components/IntroLogo'
import Landing from './components/Landing'
import SingleSeries from './components/SingleSeries'
import Person from './components/Person'
import SearchBar from './components/SearchBar';
import Watchlist from './components/Watchlist';
import Settings from './components/Settings'
import SingleMovie from './components/SingleMovie';
import NotFound from './components/NotFound'


function App(props) {

  const [loggedInUser, setLoggedInUser] = useState()
  const [movieList, setMovieList] = useState([])
  const [seriesList, setSeriesList] = useState([])
  const [successAlert, setSuccessAlert] = useState(null)
  const [errorAlert, setErrorAlert] = useState(null)


  const handleLogin = (e) => {
    e.preventDefault()
    const user = {username: e.target.username.value, password: e.target.password.value}

    axios.post(`${config.API_URL}/api/login`, user, {withCredentials: true})
    .then(response => {
      setLoggedInUser(response.data)
      setSuccessAlert('Login successful')
    })
    .catch(err => setErrorAlert(err.response.data.errorMsg))
  }


  const handleSignup = (e) => {
    e.preventDefault()
    const newUser = {
      username: e.target.username.value,
      password: e.target.password.value,
      passwordConf: e.target.password2.value
    }

    axios.post(`${config.API_URL}/api/register`, newUser)
    .then(response => {
      setLoggedInUser(response.data)
      setSuccessAlert('Registration successful! You can now log in')
    })
    .catch(err => setErrorAlert(Object.values(err.response.data)[0]))
  }


  const handleLogout = () => {
    axios.post(`${config.API_URL}/api/logout`, {}, { withCredentials: true})
    .then(setLoggedInUser(null), () => props.history.push('/'))
  }


  const getWatchlist = async () => {
    const response = await axios.get(`${config.API_URL}/api/watchlist/${loggedInUser._id}`)
    const movieData = await response.data.movieList 
    const seriesData = await response.data.seriesList 
    setMovieList(movieData)
    setSeriesList(seriesData)
 }




  // const handleMinimize = () => {
  //   setMinimize(true)
  // }


  useEffect(() => {
    if (!loggedInUser) {
      axios.get(`${config.API_URL}/api/user`, { withCredentials: true })
      .then(response => setLoggedInUser(response.data))
      .catch(err => console.log(err))
    }

    // document.addEventListener('keydown', setMinimize)

    // return () => {
    //   document.removeEventListener('keydown', setMinimize)
    // }
  }, [])


  useEffect(() => {
    loggedInUser && getWatchlist()
  }, [props])


  return (
    <>
    <div className="page">

      <div className="d-flex flex-column">
        <IntroLogo mini={props.mini} />
        <SearchBar />
      </div>
    
    <Switch>

      <Route exact path="/" render={() => {
        return <Landing />
      }} />

      <Route path="/movie/:id" render={(routeProps) => { 
          return <SingleMovie 
          user={loggedInUser} 
          movieList={movieList}
          id={routeProps.match.params.id}
        />
      }} />

      <Route path="/people/:id" render={(routeProps) => {
        return <Person 
          id={routeProps.match.params.id}
          user={loggedInUser} 
        />
      }} />

      <Route path="/series/:id" render={(routeProps) => {
        return <SingleSeries 
          user={loggedInUser} 
          seriesList={seriesList}
          id={routeProps.match.params.id}
        />
      }} />

      <Route path="/watchlist" render={() => {
        return <Watchlist 
        user={loggedInUser} 
        seriesList={seriesList}
        movieList={movieList}
         />
      }} />

      <Route path="/settings" render={() => {
        return <Settings user={loggedInUser} />
      }} />

      <Route component={NotFound} />

    </Switch>

    </div>

    <Footer 
      onSignup={handleSignup}
      onLogin={handleLogin}
      onLogout={handleLogout}
      errorMsg={errorAlert}
      successMsg={successAlert}
      user={loggedInUser}
    />
    </>
  );
}

export default withRouter(App);
