import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import config from '../config'


export default function Watchlist(props) {

    const [list, setList] = useState()

    // get user's watchlist array and set it to state
    const getWatchlist = () => {
        axios.get(`${config.API_URL}/api/watchlist/${props.user._id}`)
        .then(result => {
            setList(result.data.watchlist)
        })
        .catch(err => console.log(err))
    }

    const getMovies = () => {
        console.log(list)
    }

    useEffect(() => {
       props.user && getWatchlist()
    }, [])


    useEffect(() => {
        console.log('list got updated')
    }, [list])


    return (
        <div className="watchlist">
        <div className="d-flex align-items-center p-5">
            <div><img src="/popcorn.png" height="100" alt="popcorn" /></div>
            <div><h3>Watchlist</h3></div>

        </div>

            <ul> {
                !list ? <div>Loading...</div> :
                list.map((item, i) => {
                    return <li key={i}><Link to={`/movies/${item.id}`}>{item.title}</Link></li>
                })
            }</ul>
        </div>
    )
}
