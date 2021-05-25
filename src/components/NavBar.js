import React from 'react'
import { Nav, Button } from 'react-bootstrap'

export default function NavBar() {
    return (
        <div>
            <Nav defaultActiveKey="/home" className="flex-column border">
                <Nav.Link href="/home">Active</Nav.Link>
                <Nav.Link eventKey="link-1">Link</Nav.Link>
                <Nav.Link eventKey="link-2">Link</Nav.Link>
            </Nav>




        </div>
    )
}
