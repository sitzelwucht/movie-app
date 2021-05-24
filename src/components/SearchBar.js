import React, { useState } from 'react'
import { Button, InputGroup, FormControl } from 'react-bootstrap'

export default function SearchBar() {

    return (
        <div>
              <InputGroup className="mb-3">
                <FormControl
                placeholder="type to search..."
                aria-label="Recipient's username"
                />
                <InputGroup.Append>
                <Button variant="danger">Go</Button>
                </InputGroup.Append>
            </InputGroup>
        </div>
    )
}
