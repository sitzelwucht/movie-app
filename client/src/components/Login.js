import React from 'react'
import { Modal, Button, Form, Alert } from 'react-bootstrap'


export default function Login(props) {
    return (
        <div>

             <Modal
                {...props}
                aria-labelledby="contained-modal-title-vcenter"
                className="signup-modal"
                centered
                >
                <Modal.Header className="d-flex justify-content-between">
                   <h2>Log in</h2> 
                    <Button variant="outline-dark" onClick={props.onHide}>x</Button>
                </Modal.Header>
                <Modal.Body>

                
                { props.successMsg && <Alert variant="success">{props.successMsg}</Alert>}
                { props.errorMsg && <Alert variant="danger">{props.errorMsg}</Alert>}

                    <Form onSubmit={props.onLogin}>
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>username</Form.Label>
                            <Form.Control type="text" name="username" placeholder="Enter email" />
                        </Form.Group>

                        <Form.Group controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" name="password" placeholder="Password" />
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
