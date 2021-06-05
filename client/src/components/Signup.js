import React from 'react'
import { Modal, Button, Form } from 'react-bootstrap'


export default function Signup(props) {
    return (
        <div>
             <Modal
                {...props}
                aria-labelledby="contained-modal-title-vcenter"
                className="signup-modal"
                centered
                >
                <Modal.Header className="d-flex justify-content-between">
                   <h1>Sign up!</h1> 
                    <Button variant="light" onClick={props.onHide}>x</Button>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>username</Form.Label>
                        <Form.Control type="text" placeholder="Enter email" />
                    </Form.Group>

                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" />
                    </Form.Group>

                    <Button variant="warning" type="submit" className="mt-3">
                        Submit
                    </Button>
                    </Form>
                </Modal.Body>
            </Modal>
        </div>
    )
}
