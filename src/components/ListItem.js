import React from 'react'
import { Link } from 'react-router-dom'
import SingleMovie from './SingleMovie'

export default function ListItem(props) {
    return (
        <div className="list-item">
            <div className="d-flex align-items-center justify-content-flex-start">
            <Link to={`/movie/${props.id}`}><h4>{props.title} ({props.release ? props.release.substr(0,4): props.knownForDept})</h4></Link>
            </div>
            {
                props.overview ? <div>{props.overview.substr(0,150)}...</div> : <div>Known For: <ul>{props.knownFor.map((item, i) => {
                    return <li key={i}>{item.original_title}</li>
                })}</ul></div>
            }
        </div>
    )
}
