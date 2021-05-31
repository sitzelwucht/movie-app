import React, { useState, useEffect, useRef } from 'react'
import { Button, InputGroup, FormControl, Form, Tabs, Tab } from 'react-bootstrap'
import axios from 'axios'
import ListItem from './ListItem'

export default function SearchBar(props) {

    const [movies, setMovies] = useState([])
    const [people, setPeople] = useState([])
    const [searchResults, setSearchResults] = useState([])
    const [noInput, setNoInput] = useState(true)

    const searchRef = useRef()

    
    // return list of max 20 titles including query string
    const handleMovieSearch = async (e) => {
        e.preventDefault()
        let query = e.target.value

        if(query) {
            const response = await axios.get(`https://api.themoviedb.org/3/search/movie?query=${query}&api_key=${process.env.REACT_APP_API_KEY}`)
            const movieData = await response.data.results

            let results = []
    
            movieData.forEach(elem => {
              results.push({
                origLang: elem.original_language,
                origTitle: elem.original_title,
                overview: elem.overview,
                popularity: elem.popularity,
                posterUrl: elem.poster_path,
                release: elem.release_date,
                title: elem.title,
                voteAvg: elem.vote_average,
                id: elem.id
              })
            })
            
            setNoInput(false)
            setMovies(results)
        }
        else if (!query) {
            setNoInput(true)
        }

      }


      const handlePeopleSearch = async (e) => {
        e.preventDefault()
        let query = e.target.value
        
        if(query) {
            const response = await axios.get(`https://api.themoviedb.org/3/search/person?query=${query}&api_key=${process.env.REACT_APP_API_KEY}&language=en-US&page=1&include_adult=false`)
            const peopleData = await response.data.results
            console.log(peopleData)
            let results = []
    
            peopleData.forEach(elem => {
                results.push({
                    id: elem.id,
                    known_for: elem.known_for,
                    known_for_department: elem.known_for_department,
                    name: elem.name
                })
            })
    
            setNoInput(false)
            setPeople(results)    
        }
 
        else if (!query) {
            setNoInput(true)
        }
    }


    const handleKeywordSearch = async (e) => {
        e.preventDefault()
        let query = e.target.value

        const response = await axios.get(`https://api.themoviedb.org/3/search/multi?query=${query}&api_key=${process.env.REACT_APP_API_KEY}&language=en-US&page=1&include_adult=false`)
        const peopleData = await response.data
        console.log(peopleData)
    }



      useEffect(() => {
            setSearchResults(movies)
      }, [movies])


      useEffect(() => {
        setSearchResults(people)
        }, [people])


    return (
        <div id="search" className="mt-5">

        <Tabs defaultActiveKey="profile" id="uncontrolled-tab-example">
            <Tab eventKey="home" title="Movies">
                <input type="text" placeholder="search movies..." 
                onChange={handleMovieSearch} ref={searchRef}
                />   
            </Tab>
            <Tab eventKey="profile" title="People">
                <input type="text" placeholder="search people..." 
                onChange={handlePeopleSearch} ref={searchRef}
                />
            </Tab>
            <Tab eventKey="contact" title="Any" >
            <input type="text" placeholder="search with keyword..." 
                onChange={handleKeywordSearch} ref={searchRef}
                />
            </Tab>
        </Tabs>

        <div className="search-results">
            {
                noInput ? null : (!searchResults.length ? <div className="mt-3 no-results">No results</div> : searchResults.map((item, i) => {
                    return <ListItem key={i} 
                        id={item.id}
                        title={item.title || item.name}
                        release={item.release}
                        overview={item.overview}
                        knownFor={item.known_for}
                        knownForDept={item.known_for_department}
                    />
                }))
            }

        </div>
        </div>
    )
}
