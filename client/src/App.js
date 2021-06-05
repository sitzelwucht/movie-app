import { useEffect, useState } from 'react'
import { Route, withRouter } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css';
import Landing from './components/Landing'
import Footer from './components/Footer'
import axios from 'axios'
import config from './config'

function App() {

  const [minimize, setMinimize] = useState(false)
  const [loggedInUser, setLoggedInUser] = useState()
  const [error, setError] = useState(null)


  const handleLogin = (e) => {
    e.preventDefault()
    const user = {username: e.target.username.value, password: e.target.password.value}

    axios.post(`${config.API_URL}/api/login`, user, {withCredentials: true})
    .then(response => {
      setLoggedInUser(response.data)
    })
    .catch(err => setError(err.response.data.errorMsg))
  }


  const handleSignup = (e) => {
    e.preventDefault()
    const newUser = {
      username: e.target.username.value,
      password: e.target.password.value,
      passwordConf: e.target.password2.value
    }

    axios.post(`${config.API_URL}/api/register`, newUser)
    .then(response => setLoggedInUser(response.data))
    .catch(err => setError(Object.values(err.response.data)[0]))
  }



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
    <Footer 
      onSignup={handleSignup}
      onLogin={handleLogin}
        
    />
    </>
  );
}

export default withRouter(App);
