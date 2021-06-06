import React, { useState } from 'react'
import { Button, Modal } from 'react-bootstrap'
import Signup from './Signup'
import Login from './Login'

export default function Footer(props) {

    const [signupModalShow, setSignupModalShow] = useState(false);
    const [loginModalShow, setLoginModalShow] = useState(false);

    return (
  
        <footer className="d-flex justify-content-between">

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
                <div><Button variant="link">▸ watchlist</Button></div>
                <div><Button variant="link">▸ user settings</Button></div>
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
