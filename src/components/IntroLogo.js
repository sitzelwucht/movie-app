import React, { useState } from 'react'
import { Button } from 'react-bootstrap'


export default function IntroLogo(props) {

    

    return (
        <div>
             <div className={props.mini ? "logo-small" : "welcome-logo"}>
                <h1>Movie <span>App</span></h1>
                <img src="/popcorn.png" height="300" alt="popcorn" />
            </div>

        </div>
    )
}
