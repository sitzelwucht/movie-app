import React from 'react'
import { Modal, Button, Form, Alert } from 'react-bootstrap'


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
                   <h2>Sign up</h2> 
                    <Button variant="outline-light" onClick={props.onHide}>x</Button>
                </Modal.Header>
                <Modal.Body>

                { props.successMsg && <Alert variant="success">{props.successMsg}</Alert>}
                { props.errorMsg && <Alert variant="danger">{props.errorMsg}</Alert>}

                    <Form onSubmit={props.onSignup}>
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>username</Form.Label>
                            <Form.Control type="text" name="username" placeholder="Enter username" />
                        </Form.Group>

                        <Form.Group controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" name="password" placeholder="Password" />
                        </Form.Group>

                        <Form.Group controlId="formBasicPassword2">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" name="password2" placeholder="Confirm password" />
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
