import React, { useState, useEffect } from 'react'
import { Link, withRouter, useHistory } from 'react-router-dom'
import { Button } from 'react-bootstrap'
import config from '../config'
import axios from 'axios'


function SingleMovie(props) {

    const history = useHistory();
    const [movie, setMovie] = useState()
    const [crew, setCrew] = useState()
    const [isOnList, setIsOnList] = useState(() => {
        for (let i = 0; i < props.movieList.length; i++) {
            if (props.movieList[i].id == props.id) {
                return true
            }
        }
        return false
    })

    const [similar, setSimilar] = useState([])


    const getMovie = async () => {
        const response = await axios.get(`https://api.themoviedb.org/3/movie/${props.id}?api_key=${process.env.REACT_APP_API_KEY}`)
        const movieData = await response.data

        const cast = await axios(`https://api.themoviedb.org/3/movie/${props.id}/credits?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`)
        const castData = await cast.data

        setMovie({
        id: movieData.id,
        genres: movieData.genres,
        original_language: movieData.original_language,
        original_title: movieData.original_title,
        overview: movieData.overview,
        popularity: movieData.popularity,
        poster_path: movieData.poster_path,
        production_countries: movieData.production_countries,
        release_date: movieData.release_date,
        runtime: movieData.runtime,
        spoken_languages: movieData.spoken_languages,
        tagline: movieData.tagline,
        title: movieData.title,
        vote_average: movieData.vote_average,
        vote_count: movieData.vote_count,
        cast: castData.cast,
        })


        setCrew({
            directors: castData.crew.filter(item => item.known_for_department === 'Directing').slice(0, 1),
            writers: castData.crew.filter(item => item.known_for_department === 'Writing').slice(0, 1)
        })
        
    }


    const getSimilarMovies = async () => {
        const response = await axios.get(`https://api.themoviedb.org/3/movie/${props.id}/similar?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&page=1`)
        const similarMovies = await response.data
        setSimilar(similarMovies.results)

    }


    const editWatchlist = (bool) => {
        if(bool) {
            axios.patch(`${config.API_URL}/api/addmovie`, {
                movie: {id: movie.id, title: movie.title}, 
                user: props.user.username})
            .then(() => {
               setIsOnList(true)
              })
            .catch(err => console.log(err))
        }
        else {
            axios.patch(`${config.API_URL}/api/removemovie`, {
                movie: {id: movie.id, title: movie.title}, 
                user: props.user.username})
            .then(() => {
               setIsOnList(false)
              })
            .catch(err => console.log(err))
        }
    }


    useEffect(() => {        
        getMovie()
        getSimilarMovies()
    }, [props])



    useEffect(() => {
        if (props.movieList) {
            setIsOnList(() => {
                for (let i = 0; i < props.movieList.length; i++) {
                    if (props.movieList[i].id == props.id) {
                        return true
                    }
                }
                return false
            })
        }
    }, [movie])


    return (
        <React.Fragment>
        {
        <div className="movie-box">
          
            { movie && <React.Fragment>

                <div id="buttons">
                    <div className="d-flex justify-content-between">

                        <h2>{movie.title} ({movie.release_date.substr(0,4)})</h2>
                        {
                            props.user && props.movieList && <React.Fragment>
                         { isOnList ? 
                         <Button variant="outline-danger" onClick={() => editWatchlist(false)}>✖ remove from watchlist </Button> :
                        <Button variant="outline-dark" onClick={() => editWatchlist(true)}>✚ add to watchlist</Button>
                       
                        }  

                        </React.Fragment>
                        }

                    </div>

                    { movie.title !== movie.original_title && <h4>{movie.original_title} </h4>}
                    <div className="uppercase">{movie.production_countries.map((item, i) => {
                                            return <li key={i}>{item.name}</li>
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
                                            return <li key={i}>{item.name}</li>
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
                                    <td className="bold">Languages:</td>
                                    <td className="indent">{
                                        <ul>
                                            {movie.spoken_languages.length ? movie.spoken_languages.map((item, i) => {
                                                return <li key={i}>{item.english_name}</li>
                                            }) : 'N/A'
                                            }
                                        </ul>
                                    }</td>
                                </tr>
                                <tr>
                                    <td className="bold">Runtime:</td>
                                    <td className="indent">{movie.runtime > 0 ? `${movie.runtime} mins`: 'N/A'}</td>
                                </tr>
                                <tr>
                                    <td className="bold">Rating:</td>
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
                    <div>{movie.poster_path && <img src={`http://image.tmdb.org/t/p/w200/${movie.poster_path}`} alt="poster" />}</div>
                    
                </div>
               
                <div>

                <div>{movie.overview}</div>
                

                </div>
                
                <div className="reversed">

                <table>
                    <tbody>
                        <tr>
                            <td className="bold">Director:</td>
                            <td className="indent">
                            {
                                crew && crew.directors.map((item, i) => {

                                        return <li key={i}><Link to={`/people/${item.id}`}>{item.name}</Link></li>
                                    
                                })
                            }
                            </td>
                        </tr>
                        
                        <tr>
                        <td className="bold">Writer:</td>

                            <td className="indent">
                            {
                                crew && crew.writers.map((item, i) => {
                                        return <li key={i}><Link to={`/people/${item.id}`}>{item.name}</Link></li>
                                    
                                })
                            }
                            </td>
                        </tr>
                        <tr>
                            <td className="bold">Cast:</td>
                            <td className="indent">
                            {
                                <ul>{
                                    movie.cast.map((item, i) => {
                                        return <li key={i}><Link to={`/people/${item.id}`}>{item.name}</Link></li>
                                    })
                                }
                                </ul>  

                            }</td>
                        </tr>
                    </tbody>
                </table>
                
                </div>  
                       
                <div>
                    { similar.length > 0 && <h5>Similar movies: </h5> }
                    <ul>
                    {
                        similar.map((item, i) => {
                            return <React.Fragment>
                            <li key={i}><Link to={`/movie/${item.id}`}>{item.title}</Link></li>
                            </React.Fragment>
                        })
                    }
                    </ul>
                    </div>
            </React.Fragment>}

        </div>
        }
        
        </React.Fragment>
    )
}

export default withRouter(SingleMovie)