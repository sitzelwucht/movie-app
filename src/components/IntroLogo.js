import React from 'react'
import { Button } from 'react-bootstrap'


export default function IntroLogo() {
    return (
        <div>
             <div className="m-5 welcome-logo">
                <h1>Movie <span>App</span></h1>
                <img src="/popcorn.png" height="300" alt="popcorn" />
            </div>
            <div className="m-5 d-flex justify-content-around w-75">
                <Button variant="outline-info">create account</Button>
                <Button variant="outline-light">log in</Button>
            </div>
        </div>
    )
}
