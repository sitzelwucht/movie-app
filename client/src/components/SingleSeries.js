import React, { useState, useEffect } from 'react'
import { Link, withRouter, useHistory } from 'react-router-dom'
import { Button } from 'react-bootstrap'
import axios from 'axios'


export default function SingleSeries(props) {

    const history = useHistory();
    const [series, setSeries] = useState()
    const [similar, setSimilar] = useState([])

    const [hide, setHide] = useState(false)

    const getSeries = async () => {
        const response = await axios.get(`https://api.themoviedb.org/3/tv/${props.id}?api_key=${process.env.REACT_APP_API_KEY}`)
        const series = await response.data
        console.log(series)
        setSeries({
        first_air_date: series.first_air_date,
        genre_ids: series.genre_ids,
        id: series.id,
        title: series.name,
        origin_country: series.origin_country,
        original_language: series.original_language,
        original_name: series.original_name,
        overview: series.overview,
        popularity: series.popularity,
        vote_average: series.vote_average,
        vote_count: series.vote_count,
        poster_path: series.poster_path
        })
    }

    const getSimilarSeries = async () => {
        const response = await axios.get(`https://api.themoviedb.org/3/tv/${props.id}/similar?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&page=1`)
        const similarSeries = await response.data
        setSimilar(similarSeries.results)

    }


    useEffect(() => {
        getSeries()
        getSimilarSeries()
        setHide(false)
    }, [props])


    return (
        <>
        { !hide && 
        
            <div className="movie-box">
        { series && <>
                <div id="buttons">
                    <div className="d-flex justify-content-between">
                        <Button variant="outline-light" onClick={() => history.goBack()}>˂</Button>
                        <Button variant="dark" onClick={() => setHide(true)}>X</Button>
                    </div>
                </div>

                <div className="reversed d-flex justify-content-between align-items-center">
                    <div>
                        <h2>{series.title} ({series.first_air_date && series.first_air_date.substr(0,4)})</h2>
                        { series.title !== series.original_name && <h4>{series.original_name} </h4>}
                        <div>{series.origin_country}</div>
                    </div>
                    <div>
                        {series.poster_path && <img src={`http://image.tmdb.org/t/p/w200/${series.poster_path}`} alt="poster" />}
                    </div>
                </div>

                <div>
                    <table>
                        <tbody>
                            <tr>
                                <td className="bold">Release:</td>
                                <td className="indent">{series.first_air_date ? series.first_air_date : 'N/A'}</td>
                            </tr>
                            <tr>
                                <td className="bold">Rating:</td>
                                <td className="indent">{series.vote_average}/10 <span>({series.vote_count} votes</span>)</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                
                <div className="reversed">
                
        
                    <div>{series.overview}</div>
                </div>
                {/* <div>
                    { similar.length > 0 && <h5>Similar movies: </h5> }
                    <ul>
                    {
                        similar.map((item, i) => {
                            return <>
                            <li><Link to={`/movie/${item.id}`}>{item.title}</Link></li>
                            </>
                        })
                    }
                    </ul>
                    </div> */}
            </>}

        </div>
        
        
        }
        </>
    )
}