import React from 'react'
import IntroLogo from './IntroLogo'
import SearchBar from './SearchBar'

export default function Landing(props) {

    return (
        <div className={props.mini ? "mini" : "main-container"}>
            <IntroLogo mini={props.mini} />
            <SearchBar handleMinimize={props.handleMinimize}/>
        </div>

    )
}
