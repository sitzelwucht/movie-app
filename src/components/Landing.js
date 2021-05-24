import React from 'react'
import SearchBar from './SearchBar'

export default function Landing() {

    return (
        <div className="mx-auto mt-5 w-25">
            <h1>Movie <span>App</span></h1>
            <img src="popcorn.png" height="425" alt="popcorn" />
            <SearchBar />
        </div>
    )
}
