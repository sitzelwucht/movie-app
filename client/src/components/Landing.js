import React from 'react'
import IntroLogo from './IntroLogo'
import SearchBar from './SearchBar'
import { Route, withRouter } from 'react-router-dom'
import SingleMovie from './SingleMovie';
import SingleSeries from './SingleSeries'
import Person from './Person'


export default function Landing(props) {

    return (
        <div className={props.mini ? "mini" : "main-container"}>
    
                <h1 className="m-5">Welcome</h1>
                
        </div>

    )
}
