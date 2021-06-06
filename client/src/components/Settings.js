import React from 'react'

export default function Settings(props) {
    return (
        <div className="watchlist">

        <div className="d-flex align-items-center p-5">
            <div><img src="/popcorn.png" height="100" alt="popcorn" /></div>
            <div><h3>{props.user && props.user.username}</h3></div>
        </div>
            
            <ul></ul>
        </div>
    )
}
