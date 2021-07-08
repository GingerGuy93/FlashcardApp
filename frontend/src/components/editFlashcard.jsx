import React, {useState} from "react";
import useForm from "./useForm";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import axios from "axios";
import Form from "react-bootstrap/Form";

const EditFlashcard = (props) => {
    const {values, handleChange, handleSubmit} = useForm(editCard);
    const [show, setShow] = useState(false);
    const [edit, setEdit] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow  = () => setShow(true);

    async function editCard() {
        let cards  ={...values};
        try {
            await axios.put(`http://127.0.0.1:8000/collection/cards/${props.collectionId}/${props.flashcardId}`, cards)
            setEdit(true);
            props.refresh()
        } catch (err) {
        }
    }

    return (
        <>
            <Button variant="primary" onClick={handleShow}>
                Edit
            </Button>

            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header>
                    <Modal.Title>Enter the title and description of your edited flashcard </Modal.Title>
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
                    {edit ? <p className='text-center'>Submit</p> : <Button type='submit' variant="primary">Submit</Button>}
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default EditFlashcard;