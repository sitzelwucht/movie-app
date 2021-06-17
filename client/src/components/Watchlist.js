import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'


export default function Watchlist(props) {

    
    return (
        <div className="watchlist">
         {
       
           props.user && <>
           <div><h3>Watchlist</h3></div>
           <div className="d-flex">
           
            <ul> <h2>Movies</h2>{
                !props.movieList ? <div>Loading...</div> :
                props.movieList.map((item, i) => {
                    return <li key={i}>
                    <Link to={`/movie/${item.id}`}>{item.title} </Link>
                    </li>
                })
            }</ul>

            <ul> <h2>Series</h2>{
                !props.seriesList ? <div>Loading...</div> :
                props.seriesList.map((item, i) => {
                    return <li key={i}>
                    <Link to={`/series/${item.id}`}>{item.title}</Link>
                    </li>
                })
            }</ul>

            </div>
            </>

         }
        
        </div>
    )
}
