import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Carousel } from  'react-bootstrap'
import axios from 'axios'

export default function Landing(props) {

    const [upcoming, setUpcoming] = useState([])


    useEffect(async () => {
        const response = await axios.get(`https://api.themoviedb.org/3/movie/upcoming?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&page=1`)
        const upcomingData = await response.data
        setUpcoming(upcomingData.results)
    }, [])

    return (
        <div className={props.mini ? "mini" : "main-container"}>
    
                <div className="m-5 upcoming">Upcoming titles:</div>

                <Carousel>
                {
                    !upcoming ?  <div>loading...</div> :
                    upcoming.map((item, i) => {
                        return (
                            <Carousel.Item>
                                <Link to={`/movie/${item.id}`}><div key={i} className="slider-item">
                                    <div className="justify-content-between m-1">
                                        <div className="slider-title">{item.title}</div>
                                        <div className="slider-date">{new Date(item.release_date).toDateString()}</div>
                                    </div>
                                    <img src={`http://image.tmdb.org/t/p/w300/${item.poster_path}`}/>
                                </div>
                                </Link>
                            </Carousel.Item>
                        )
                    })
                }

                </Carousel>

        </div>

    )
}
