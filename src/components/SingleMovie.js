import React, { useState, useEffect } from 'react'
import { Link, withRouter, useHistory } from 'react-router-dom'
import { Button } from 'react-bootstrap'
import axios from 'axios'

function SingleMovie(props) {

    const history = useHistory();
    const [movie, setMovie] = useState()
    const [similar, setSimilar] = useState([])

    const [hide, setHide] = useState(false)

    const getMovie = async () => {
        const response = await axios.get(`https://api.themoviedb.org/3/movie/${props.id}?api_key=${process.env.REACT_APP_API_KEY}`)
        const movie = await response.data

        setMovie({
        id: movie.id,
        genres: movie.genres,
        original_language: movie.original_language,
        original_title: movie.original_title,
        overview: movie.overview,
        popularity: movie.popularity,
        poster_path: movie.poster_path,
        production_countries: movie.production_countries,
        release_date: movie.release_date,
        runtime: movie.runtime,
        spoken_languages: movie.spoken_languages,
        tagline: movie.tagline,
        title: movie.title,
        vote_average: movie.vote_average,
        vote_count: movie.vote_count
        })
    }

    const getSimilarMovies = async () => {
        const response = await axios.get(`https://api.themoviedb.org/3/movie/${props.id}/similar?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&page=1`)
        const similarMovies = await response.data
        setSimilar(similarMovies.results)

    }


    useEffect(() => {
        getMovie()
        getSimilarMovies()
        setHide(false)
    }, [props])


    return (
        <>
        {
           !hide && <div className="movie-box">
     
            { movie && <>
                <div id="buttons">
                    <div className="d-flex justify-content-between">
                        <Button variant="outline-light" onClick={() => history.goBack()}>˂</Button>
                        <Button variant="dark" onClick={() => setHide(true)}>X</Button>
                    </div>
                </div>

                <div className="reversed">
                    <h2>{movie.title} ({movie.release_date.substr(0,4)})</h2>
                    { movie.title !== movie.original_title && <h4>{movie.original_title} </h4>}
                    <div>{movie.production_countries.map((item, i) => {
                                        return <li>{item.name}</li>
                                    })}</div>
                    { movie.tagline && <h6 className="mt-5">{movie.tagline}</h6> }
                </div>

                <div>
                    <table>
                        <tbody>
                        <tr>
                            <td className="bold">Genre:</td>
                            <td className="indent">
                                {
                                    <ul>
                                {
                                movie.genres.length ? movie.genres.map((item, i) => {
                                        return <li>{item.name}</li>
                                    }) : <li>N/A</li>
                                }
                                </ul>
                                }</td>
                            </tr>
                            <tr>
                                <td className="bold">Release:</td>
                                <td className="indent">{movie.release_date}</td>
                            </tr>
                            <tr>
                                <td className="bold">Runtime:</td>
                                <td className="indent">{movie.runtime} mins</td>
                            </tr>
                            <tr>
                                <td className="bold">Rating:</td>
                                <td className="indent">{movie.vote_average} <span>({movie.vote_count} votes</span>)</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                
                <div className="reversed">
                
        
                    <div>{movie.overview}</div>
                </div>
                <div>
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
                    </div>
            </>}

        </div>
        }
        
        </>
    )
}

export default withRouter(SingleMovie)