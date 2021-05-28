import React from 'react'
import { Link } from 'react-router-dom'
import SingleMovie from './SingleMovie'

export default function ListItem(props) {
    return (
        <div className="movie-item">

            <div className="d-flex align-items-center justify-content-flex-start">
            <Link to={`/movie/${props.id}`}><h4>{props.title}</h4></Link>
            <h6>({props.release && props.release.substr(0,4)})</h6>
            </div>
            <div>{props.overview}</div>
        </div>
    )
}
