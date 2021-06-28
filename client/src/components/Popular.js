import React, {useEffect, useState} from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'


export default function Popular(props) {


    const [popular, setPopular] = useState([])

    const getPopular = async () => {
        const response = await axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&page=1`)
        const popularList = await response.data
        setPopular(popularList)
      }

    useEffect(() => {
        getPopular()
    }, [])


    return (
        <div className="mx-auto">


            <h3 className="popular-title">Popular <span>({new Date().toLocaleDateString()})</span>
            <div>Movies with the most activity in terms of views and ratings</div></h3>
            
            <div className="m-5 popular-list">
            <ul>
            { !popular.results ? <div>loading...</div> : popular.results.map((item, i) => {
                return<Link to={`/movie/${item.id}`}><li key={i}>{item.title}</li></Link>
            })}
            </ul>
            </div>
        </div>
    )
}
