import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { Button } from 'react-bootstrap'
import config from '../config'
import axios from 'axios'

export default function SingleSeries(props) {

    const history = useHistory();
    const [series, setSeries] = useState()
    const [isOnList, setIsOnList] = useState(() => {
        for (let i = 0; i < props.seriesList.length; i++) {
            if (props.seriesList[i].id == props.id) {
                return true
            }
        }
        return false
    })


    const getSeries = async () => {
        const response = await axios.get(`https://api.themoviedb.org/3/tv/${props.id}?api_key=${process.env.REACT_APP_API_KEY}`)
        const series = await response.data

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

    const editWatchlist = (bool) => {
        if(bool) {
            axios.patch(`${config.API_URL}/api/addseries`, {
                series: {id: series.id, title: series.title}, 
                user: props.user.username})
            .then(() => {
               setIsOnList(true)
              })
            .catch(err => console.log(err))
        }
        else {
            axios.patch(`${config.API_URL}/api/removeseries`, {
                series: {id: series.id, title: series.title}, 
                user: props.user.username})
            .then(() => {
               setIsOnList(false)
              })
            .catch(err => console.log(err))
        }
    }

    useEffect(() => {
        getSeries()
    }, [props])



    useEffect(() => {
        if (props.seriesList) {
            setIsOnList(() => {
                for (let i = 0; i < props.seriesList.length; i++) {
                    if (props.seriesList[i].id == props.id) {
                        return true
                    }
                }
                return false
            })
        }
    }, [series])



    return (
        <React.Fragment>
            <div className="movie-box">
        { series && <React.Fragment>
                <div id="buttons">
                {
                            props.user && props.seriesList && <React.Fragment>
                         { !isOnList ? 
                         <Button variant="outline-dark" onClick={() => editWatchlist(true)}>✚ add to watchlist</Button> :
                        <Button variant="outline-danger" onClick={() => editWatchlist(false)}>✖ remove from watchlist</Button>
                       
                        }  

                        </React.Fragment>
                        }

                </div>

                <div className="reversed d-flex justify-content-between align-items-center">
                    <div>
                        <h2>{series.title} ({series.first_air_date && series.first_air_date.substr(0,4)})</h2>
                        { series.title !== series.original_name && <h4>{series.original_name} </h4>}
                        <div>{series.origin_country}</div>
                <table className="mt-5">
                    <tbody>
                        <tr>
                            <td className="bold">Release:</td>
                            <td className="indent">{series.first_air_date ? series.first_air_date : 'N/A'}</td>
                        </tr>
                        <tr>
                            <td className="bold">Rating:</td>
                            {
                                !series.vote_average ? <td className="indent">'N/A'</td> :
                                <td className="indent">
                                {series.vote_average >= 9 && <span className="veryhigh bold">{series.vote_average}</span> }  
                                {series.vote_average >= 8 && series.vote_average< 9 && <span className="high bold">{series.vote_average}</span> }
                                {series.vote_average >= 7 && series.vote_average < 8 && <span className="above-medium bold">{series.vote_average}</span> }  
                                {series.vote_average >= 6 && series.vote_average < 7 && <span className="medium bold">{series.vote_average}</span> }  
                                {series.vote_average >= 5 && series.vote_average < 6 && <span className="below-medium bold">{series.vote_average}</span> }  
                                {series.vote_average >= 4 && series.vote_average < 5 && <span className="low bold">{series.vote_average}</span> }    
                                {series.vote_average <= 3 && series.vote_average < 4 && <span className="verylow bold">{series.vote_average}</span> }  
                                /10 <span>({series.vote_count} votes</span>)
                                </td>

                            }

                        </tr>
                    </tbody>
                </table>
                    </div>
                    <div>
                        {series.poster_path && <img src={`http://image.tmdb.org/t/p/w200/${series.poster_path}`} alt="poster" />}
                    </div>
                </div>
                
              
                
                <div>
                
        
                    <div>{series.overview}</div>
                </div>
            </React.Fragment>}

        </div>
        </React.Fragment>
    )
}
