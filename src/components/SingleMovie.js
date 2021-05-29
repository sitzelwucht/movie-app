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

    useEffect(() => {

    }, [hide])
    return (
        <>
        {
           !hide && <div className="movie-box">
     
            { movie && <>
                <div>
                    <div className="d-flex justify-content-between mb-3">
                        <Button variant="outline-light" onClick={() => history.goBack()}>back</Button>
                        <Button variant="dark" onClick={() => setHide(true)}>X</Button>
                    </div>
                    <h2>{movie.title}</h2>
                    { movie.title !== movie.original_title && <h4>{movie.original_title}</h4>}
                </div>
                <div>
                <div>Release: {movie.release_date}</div>
                <div>Runtime: {movie.runtime} mins</div>
                <div>Rating: {movie.vote_average} <span>({movie.vote_count} votes</span>)</div>
                </div>
                <div><h6>{movie.tagline}</h6></div>
      
                <div>{movie.overview}</div>
                <div>
                    <h5>Similar movies: </h5>
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