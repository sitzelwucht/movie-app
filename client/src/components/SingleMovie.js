import React, { useState, useEffect } from 'react'
import { Link, withRouter, useHistory } from 'react-router-dom'
import { Button } from 'react-bootstrap'
import config from '../config'
import axios from 'axios'
import SearchBar from './SearchBar'

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

    const addToWatchlist = () => {
        axios.patch(`${config.API_URL}/api/add`, {
            movie: {id: movie.id, title: movie.title}, 
            user: props.user.username})
        .then(response => {
            console.log(response)
          })
        .catch(err => console.log(err))
    }



    useEffect(() => {
        getMovie()
        getSimilarMovies()

    }, [props])



    
    return (
        <>

        {
           !hide && <div className="movie-box">

            { movie && <>
                <div id="buttons">

                    <div className="d-flex justify-content-between">
                        <h2>{movie.title} ({movie.release_date.substr(0,4)})</h2>
                        <Button variant="outline-dark" onClick={addToWatchlist}>+ add to watchlist</Button>
                    </div>

                    { movie.title !== movie.original_title && <h4>{movie.original_title} </h4>}
                    <div className="uppercase">{movie.production_countries.map((item, i) => {
                                            return <li>{item.name}</li>
                                            })}</div>
                </div>


                <div className="reversed d-flex justify-content-between align-items-center">

                <div className="d-flex flex-column">
                    <div>
                        { movie.tagline && <h6 className="mt-5">{movie.tagline}</h6> }
                    </div>

                    <div className="mt-5">
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
                                    <td className="indent">{new Date(movie.release_date).toDateString()}</td>
                                </tr>
                                <tr>
                                    <td className="bold">Runtime:</td>
                                    <td className="indent">{movie.runtime} mins</td>
                                </tr>
                                <tr>
                                    <td className="bold">Rating:</td>
                                    {/* <td className="indent">
                                    {   avgRating ? <>
                                        <span className={color}>{avgRating} </span>
                                        /10 <span>({movie.vote_count} votes</span>)</> : 'N/A'
                                    }
                                    </td> */}

                                    {
                                        !movie.vote_average ? <td className="indent">N/A</td> :
                                        <td className="indent">
                                        {movie.vote_average >= 9 && <span className="veryhigh bold">{movie.vote_average}</span> }  
                                        {movie.vote_average >= 8 && movie.vote_average< 9 && <span className="high bold">{movie.vote_average}</span> }
                                        {movie.vote_average >= 7 && movie.vote_average < 8 && <span className="above-medium bold">{movie.vote_average}</span> }  
                                        {movie.vote_average >= 6 && movie.vote_average < 7 && <span className="medium bold">{movie.vote_average}</span> }  
                                        {movie.vote_average >= 5 && movie.vote_average < 6 && <span className="below-medium bold">{movie.vote_average}</span> }  
                                        {movie.vote_average >= 4 && movie.vote_average < 5 && <span className="low bold">{movie.vote_average}</span> }    
                                        {movie.vote_average <= 3 && movie.vote_average < 4 && <span className="verylow bold">{movie.vote_average}</span> }  
                                        /10 <span>({movie.vote_count} votes</span>)
                                        </td>
                                        
                                    }
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                    <div><img src={`http://image.tmdb.org/t/p/w200/${movie.poster_path}`} alt="poster" /></div>
                    
                </div>
               
                <div>

                <div>{movie.overview}</div>
                
                   
                </div>
                

                <div className="reversed">
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