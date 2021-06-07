import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'


export default function Watchlist(props) {


    return (
        <div className="watchlist">
         {

           props.user &&  <><div><h3>Watchlist</h3></div>
            <ul> {
                !props.watchlist ? <div>Loading...</div> :
                props.watchlist.map((item, i) => {
                    return <li key={i}><Link to={`/movie/${item.id}`}>{item.title}</Link></li>
                })
            }</ul>
            </>

         }
        
        </div>
    )
}
