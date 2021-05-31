import React, { useState, useEffect, useRef } from 'react'
import { Tabs, Tab } from 'react-bootstrap'
import axios from 'axios'
import ListItem from './ListItem'

export default function SearchBar(props) {

    const [movies, setMovies] = useState([])
    const [people, setPeople] = useState([])
    const [series, setSeries] = useState([])
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
                movie: true,
                origLang: elem.original_language,
                origTitle: elem.original_title,
                overview: elem.overview,
                release: elem.release_date,
                title: elem.title,
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


    const handleTVSearch = async (e) => {
        e.preventDefault()
        let query = e.target.value

        if(query) {
            const response = await axios.get(`https://api.themoviedb.org/3/search/tv?query=${query}&api_key=${process.env.REACT_APP_API_KEY}&language=en-US&page=1&include_adult=false`)
        const seriesData = await response.data.results
        let results = []

        seriesData.forEach(elem => {
            results.push({
                series: true,
                id: elem.id,
                title: elem.name,
                overview: elem.overview,
                release: elem.first_air_date
            })
        })

        setNoInput(false)
        setSeries(results)  

        } else if (!query) {
            setNoInput(true)
        }
    }

      useEffect(() => {
            setSearchResults(movies)
      }, [movies])


      useEffect(() => {
        setSearchResults(people)
        }, [people])


      useEffect(() => {
        setSearchResults(series)
        }, [series])



    return (
        <div class="search">

            <Tabs defaultActiveKey="profile" id="uncontrolled-tab-example">
                <Tab eventKey="profile" title="Movies">
                    <input type="text" placeholder="search movies..." 
                    onChange={handleMovieSearch} ref={searchRef}
                    />   
                </Tab>
                <Tab eventKey="home" title="People">
                    <input type="text" placeholder="search people..." 
                    onChange={handlePeopleSearch} ref={searchRef}
                    />
                </Tab>
                <Tab eventKey="contact" title="TV" >
                <input type="text" placeholder="search series..." 
                    onChange={handleTVSearch} ref={searchRef}
                    />
                </Tab>
            </Tabs>


                <div className="search-results">
                    {
                        noInput ? null : (!searchResults.length ? <div className="no-results">No results</div> : searchResults.map((item, i) => {
                            return <ListItem key={i}
                                movie={item.movie}
                                series={item.series} 
                                id={item.id}
                                title={item.title}
                                name={item.name}
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
