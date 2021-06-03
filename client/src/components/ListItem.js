import React from 'react'
import { Link } from 'react-router-dom'

export default function ListItem(props) {

    return (
        <div className="list-item">
            <div className="d-flex align-items-center justify-content-flex-start">
            {
                props.title ? (props.series ? <Link to={`/series/${props.id}`}><h4>{props.title} ({props.release && props.release.substr(0,4)})</h4></Link> : 
                <Link to={`/movie/${props.id}`}><h4>{props.title} ({props.release && props.release.substr(0,4)})</h4></Link>
                ) :
                <Link to={`/people/${props.id}`}><h4>{props.name} ({props.knownForDept})</h4></Link>
            }
            </div>
            {
                props.title ? (props.overview? <div>{props.overview.substr(0,150)}...</div> : null) : <div>Known For: <ul>{props.knownFor.map((item, i) => {
                    return <Link to={`/movie/${item.id}`}><li key={i}>{item.original_title}</li></Link>
                })}</ul></div>
            }
        </div>
    )
}
