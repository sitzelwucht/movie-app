import React from 'react'

export default function ListItem(props) {
    return (
        <div className="movie-item">
            <h3>{props.title}</h3>
            <h4>{props.release && props.release.substr(0,4)}</h4>
            <div>{props.overview}</div>
        </div>
    )
}
