import React, {useState} from "react";
import useForm from "./useForm";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import axios from "axios";
import Form from "react-bootstrap/Form";

const CreateFlashcard = (props) => {
    const {values, handleChange, handleSubmit} = useForm(addCard);
    const [show, setShow] = useState(false);
    const[add, setAdd] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    async function addCard() {
        let cards = {...values};
        try{
            await axios.post(`http://127.0.0.1:8000/cards/${props.collectionId}`, cards);
            setAdd(true);
            props.refresh()
        } catch (err) {
            return
        }
    }
    return (
        <>
            <Button variant="primary" onClick={handleShow}>
                Add A New Flashcard
            </Button>

            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header>
                    <Modal.Title>Enter the title and description of your new flashcard </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group controlId="title">
                            <Form.Label>Title of flashcard</Form.Label>
                            <Form.Control type="text" placeholder="Title..." name="title" onChange={handleChange}
                                          value={values.title} required={true} />
                        </Form.Group>
                        <Form.Group controlId="description">
                            <Form.Label>Description of flashcard</Form.Label>
                            <Form.Control type="text" placeholder="Description..." name="description" onChange={handleChange}
                                          value={values.description} required={true} />
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

export default CreateFlashcard;
