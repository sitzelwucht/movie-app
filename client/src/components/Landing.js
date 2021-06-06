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
    
                <SearchBar handleMinimize={props.handleMinimize} mini={props.mini}/>
                
                <div className="d-flex flex-column">
        
                <IntroLogo mini={props.mini} />
       
                <Route path="/movie/:id" render={(routeProps) => {
                    return <SingleMovie 
                    id={routeProps.match.params.id}
                    user={props.user} 
                    />
                }} />

                <Route path="/people/:id" render={(routeProps) => {
                        return <Person 
                        id={routeProps.match.params.id}
                        user={props.user} 
                        />
                    }} />

                <Route path="/series/:id" render={(routeProps) => {
                    return <SingleSeries 
                    id={routeProps.match.params.id}
                    user={props.user} 
                    />
                }} /> 


            </div>
        </div>

    )
}
