import React, { useEffect, useState } from 'react'
import { Link, withRouter, useHistory } from 'react-router-dom'
import { Button } from 'react-bootstrap'
import axios from 'axios'

function Person(props) {

    const history = useHistory();
    const [person, setPerson] = useState()
    const [credits, setCredits] = useState()

    const [hide, setHide] = useState(false)
    const [showFull, setShowFull] = useState(false)

    const getPerson = async () => {

        const response = await axios.get(`https://api.themoviedb.org/3/person/${props.id}?api_key=${process.env.REACT_APP_API_KEY}`)
        const person = await response.data

        setPerson({
            movie: false,
            name: person.name,
            bio: person.biography,
            birthday: person.birthday,
            death: person.deathday,
            placeOfBirth: person.place_of_birth,
            imdbId: person.imdb_id,
            img: person.profile_path,

        })

    }

    const getCredits = async () => {
        const response = await axios.get(`https://api.themoviedb.org/3/person/${props.id}/movie_credits?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`)
        const data = await response.data.cast
    
        const credits = data.map((item) => {
            return {id: item.id, title: item.original_title}
        })
        setCredits(credits)
    }

    useEffect(() => {
        getPerson()
        getCredits()
    }, [props])


    return (
        <>
        <div className="movie-box">

        { person && <>
        
            <div className="d-flex justify-content-between align-items-center">
            
                <div >
                    <h2>{person.name}</h2>
                </div>
                <div>
                   { person.img && <img src={`http://image.tmdb.org/t/p/w200/${person.img}`} alt="profile" />} 
                </div>
            </div>

            <div className="reversed">
                <table>
                    <tbody>
                        <tr>
                            <td className="bold">Date of Birth:</td>
                            <td className="indent">{person.birthday ? person.birthday : 'N/A'}</td>
                        </tr>
                        {
                            person.death ?
                            <tr>
                            <td className="bold">Died:</td>
                            <td className="indent">{person.death}</td>
                            </tr> : null
                        }
                        <tr>
                            <td className="bold">Place of birth:</td>
                            <td className="indent">{person.placeOfBirth ? person.placeOfBirth : 'N/A'}</td>
                        </tr>

                    </tbody>
                </table>
            </div>

            { person.bio &&
                <div>

                {
                    showFull ? 
                    <> {person.bio} <Button variant="link" onClick={() => setShowFull(false)}>show less</Button></> : 
                    <> {person.bio.substr(0, 400)} <Button variant="link" onClick={() => setShowFull(true)}>show more</Button></>

                }
            </div>
            }
            <div><ul id="credits"><span className="bold">Credits:</span>

            { credits && credits.map((item, i) => {
                return <li key={i}><Link to={`/movie/${item.id}`}>{item.title}</Link></li>
            })
            }
            </ul>
            </div>



            </>
        }
        </div>
    </>
    )
}


export default withRouter(Person)