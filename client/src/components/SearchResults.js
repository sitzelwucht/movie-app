import React from 'react'

export default function SearchResults(props) {
    return (
        <div className="search-results">

            {
                noInput ? null : (!searchResults.length ? <div className="mt-3 no-results">No results</div> : searchResults.map((item, i) => {
                    return <ListItem key={i} 
                        id={item.id}
                        title={item.title}
                        release={item.release}
                        overview={item.overview}
                        
                    />
                }))
            }
        </div>
    )
}
