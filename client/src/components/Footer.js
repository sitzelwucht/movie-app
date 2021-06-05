import React, { useState } from 'react'
import { Button, Modal } from 'react-bootstrap'
import Signup from './Signup'
import Login from './Login'

export default function Footer(props) {

    const [signupModalShow, setSignupModalShow] = useState(false);
    const [loginModalShow, setLoginModalShow] = useState(false);

    return (
  
        <footer className="p-3">

            <div>
                Powered by <a href="https://themoviedb.org" 
                target="_blank" 
                rel="noreferrer">
                <img src="/themoviedb.svg" height="15" alt="the movie database" />
                </a>
            </div>
            
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


        </footer>
      
    )
}
