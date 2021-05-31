import React, { useState } from 'react'
import { Button } from 'react-bootstrap'


export default function IntroLogo(props) {

    

    return (
        <div className="intro-container">
             <div className={props.mini ? "logo-small" : "welcome-logo"}>
                <div><h1>Movie <span>App</span></h1></div>
                <div><img src="/popcorn.png" height="300" alt="popcorn" /></div>
            </div>

        </div>
    )
}
