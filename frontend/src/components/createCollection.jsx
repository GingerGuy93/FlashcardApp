import React, {useState} from "react";
import useForm from "./useForm";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import axios from "axios";
import Form from 'react-bootstrap/Form';

const CreateCollection = (props) => {
    const {values, handleChange, handleSubmit} = useForm(addCard);
    const [show, setShow] = useState(false);
    const [add, setAdd] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    async function addCard() {
        let collection = {...values};
        try {
            await axios.post('http://127.0.0.1:8000/collection/', collection);
            setAdd(true);
            props.refresh()
        } catch (err) {
            return
        }

    }
    return (
        <>
            <Button variant="primary" onClick={handleShow}>
                Add A New Collection
            </Button>

            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header>
                    <Modal.Title>Enter the name of your new collection </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group controlId="name">
                            <Form.Label>Name of new collection</Form.Label>
                            <Form.Control type="text" placeholder="Name..." name="name" onChange={handleChange}
                                          value={values.name} required={true} />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>Close</Button>
                    {add ? <p className='text-center'>Submit</p> : <Button type='submit' variant="primary">Submit</Button>}
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default CreateCollection;