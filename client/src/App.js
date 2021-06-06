import { useEffect, useState } from 'react'
import { Route, withRouter } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css';
import Landing from './components/Landing'
import Footer from './components/Footer'
import axios from 'axios'
import config from './config'

function App(props) {

  const [minimize, setMinimize] = useState(false)
  const [loggedInUser, setLoggedInUser] = useState()
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

  
  const handleMinimize = () => {
    setMinimize(true)
  }


  useEffect(() => {
    if (!loggedInUser) {
      axios.get(`${config.API_URL}/api/user`, { withCredentials: true })
      .then(response => setLoggedInUser(response.data))
      .catch(err => console.log(err))
    }

    document.addEventListener('keydown', setMinimize)

    return () => {
      document.removeEventListener('keydown', setMinimize)
    }
  })


  return (
    <>
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
      onLogout={handleLogout}
      errorMsg={errorAlert}
      successMsg={successAlert}
      user={loggedInUser}
    />
    </>
  );
}

export default withRouter(App);
