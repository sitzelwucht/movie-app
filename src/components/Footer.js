import React from 'react'
import { Button } from 'react-bootstrap'

export default function Footer() {
    return (
  
        <footer className="p-3">
            <div className="d-flex flex-column mb-5 align-items-center">
                <div><Button variant="outline-warning" className="mb-3">create account</Button></div>
                <div><Button variant="outline-light">log in</Button></div>
            </div>
        <div>
        Powered by <a href="https://themoviedb.org" 
            target="_blank" 
            rel="noreferrer">
            <img src="/themoviedb.svg" height="15" alt="the movie database" />
            </a>
        </div>

        </footer>
      
    )
}
