import React, { useState, useEffect, useRef } from 'react'
import { Button, InputGroup, FormControl, Form } from 'react-bootstrap'
import axios from 'axios'
import ListItem from './ListItem'

export default function SearchBar(props) {

    const [movies, setMovies] = useState([])
    const [searchResults, setSearchResults] = useState([])
    const [noInput, setNoInput] = useState(true)

    const searchRef = useRef()

    
    // return list of max 20 titles including query string
    const handleInputDynamically = async (e) => {
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


      useEffect(() => {
            setSearchResults(movies)
      }, [movies])


    return (
        <div>
        {/* <Form onSubmit={handleSearch}>
        <InputGroup className="mb-3">
                <FormControl
                name="search"
                placeholder="type to search..."
                aria-label="Recipient's username"
                />
                <InputGroup.Append>
                <Button type="submit" variant="danger" >Go</Button>
                </InputGroup.Append>
            </InputGroup>
        </Form> */}

        <input type="text" id="keywordSearch" placeholder="start typing to search" 
            onChange={handleInputDynamically} ref={searchRef}
        />
        <div className="search-results">

            {
                noInput ? null : (!searchResults.length ? <div>No results</div> : searchResults.map((item, i) => {
                    return <ListItem key={i} 
                        id={item.id}
                        title={item.title}
                        release={item.release}
                        overview={item.overview}
                        
                    />
                }))
            }
        </div>
        </div>
    )
}
