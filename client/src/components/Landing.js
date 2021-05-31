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
            <IntroLogo mini={props.mini} />
            <SearchBar handleMinimize={props.handleMinimize}/>
            
            <Route path="/movie/:id" render={(routeProps) => {
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
            }} /> 

        </div>

    )
}
