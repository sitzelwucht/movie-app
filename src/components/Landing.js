import React from 'react'
import SearchBar from './SearchBar'

export default function Landing(props) {

    return (
        <div className="mx-auto mt-5 welcome-logo">
            <h1>Movie <span>App</span></h1>
            <img src="popcorn.png" height="300" alt="popcorn" />
            <SearchBar onSearch={props.onSearch}/>
        </div>
    )
}
