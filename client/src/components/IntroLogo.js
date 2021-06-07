import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Button } from 'react-bootstrap'


export default function IntroLogo(props) {

    
    return (
        <Link to="/">
            {/* <div className={props.mini ? "logo-small" : "welcome-logo"}> */}
            <div className="logo-small">
                <div><h1>Movie <span>App</span></h1></div>
                <div><img src="/popcorn.png" height="300" alt="popcorn" /></div>
            </div>
        </Link>

  
    )
}
