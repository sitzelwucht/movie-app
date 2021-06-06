import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Button, Modal } from 'react-bootstrap'
import Signup from './Signup'
import Login from './Login'
import StatusAlert from './StatusAlert'


export default function Footer(props) {

    const [signupModalShow, setSignupModalShow] = useState(false);
    const [loginModalShow, setLoginModalShow] = useState(false);
    // const [alertShow, setAlertShow] = useState(false)


    // useEffect(() => {
    //     setAlertShow(true)
    //     setTimeout(() => {
    //         setAlertShow(false)
    //     }, 1500);
    // }, [props.user])

    return (
  
        <footer className="d-flex justify-content-between">

            {/* {
                alertShow &&  <StatusAlert 
                show={alertShow} 
                msg={props.user ? `Welcome ${props.user.username}` : 'You have been logged out'}
                />
            } */}
            <div>
                Powered by <a href="https://themoviedb.org" 
                target="_blank" 
                rel="noreferrer">
                <img src="/themoviedb.svg" height="15" alt="the movie database" />
                </a>
            </div>


        {
            props.user ? <div className="user-box">
                <div className="username">{props.user.username}</div> 
                <div><Link to="/watchlist"><Button variant="link">▸ watchlist</Button></Link></div>
                <div><Link to="/settings"><Button variant="link">▸ user settings</Button></Link></div>
                <div><Button variant="danger" onClick={props.onLogout}>■ Logout</Button></div>
            </div>:
            <div className="footer-btns">
                <Button variant="link" 
                show={signupModalShow}
                onClick={() => setSignupModalShow(true)}>create account</Button>
                
                <Button variant="link"
                show={loginModalShow}
                onClick={() => setLoginModalShow(true)}>log in</Button>

                <Signup 
                show={signupModalShow} 
                onHide={() => setSignupModalShow(false)}
                onSignup={props.onSignup}
                errorMsg={props.errorMsg}
                successMsg={props.successMsg}
                />

                <Login 
                show={loginModalShow} 
                onHide={() => setLoginModalShow(false)}
                onLogin={props.onLogin}
                errorMsg={props.errorMsg}
                successMsg={props.successMsg}
                />
                
            </div>
        }

        </footer>
      
    )
}
