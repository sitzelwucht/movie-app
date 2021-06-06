import React from 'react'
import { Modal } from 'react-bootstrap'


export default function StatusAlert(props) {
    return (
        <div>
             <Modal
                {...props}
                aria-labelledby="contained-modal-title-vcenter"
                className="signup-modal"
                centered
                >
                <Modal.Body>
                    <h2>{props.msg}</h2>
                </Modal.Body>
            </Modal>
        </div>
    )
}
