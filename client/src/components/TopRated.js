import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

export default function TopRated() {

    const [top, setTop] = useState([])


    const getTop = async () => {
        const response = await axios.get(`https://api.themoviedb.org/3/movie/top_rated?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&page=1`)
        const topList = await response.data
        
        setTop(topList.results)
    }

    useEffect(() => {
        getTop()
    }, [])

    return (
        <div>

            { !top ? <div>Loading...</div> : top.map((item, i) => {
                return <Link to={`/movie/${item.id}`}><div key={i}>{item.title}</div></Link>
            })}
        </div>
    )
}
