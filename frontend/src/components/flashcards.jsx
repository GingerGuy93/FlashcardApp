import React, {useState, useEffect} from "react";
import axios from "axios";
import Card from "react-bootstrap/Carousel";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

const Flashcards = (props) => {
    const [flashcard, setFlashcard] = useState([]);
    const [index, setIndex] = useState(0);
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    // useEffect(() => {getFlashcards(props.collectionId)}, [props.collectionId])

    let getFlashcards = async (collectionId) => {
        let response = await axios.get(`http://127.0.0.1:8000/cards/${collectionId}`);
        if (response.data){setFlashcard(response.data)}
        else{setFlashcard([])}
        ;
    }

    let nextFlashcard = () => {
        let tempFlashcardNum = index + 1;
        if (tempFlashcardNum > flashcard.length -1) {
            tempFlashcardNum = 0
        }
        setIndex(tempFlashcardNum);
    }

    let previousFlashcard =() => {
        let tempFlashcardNum = index - 1;
        if (tempFlashcardNum < 0) {
            tempFlashcardNum = flashcard.length - 1
        }
        setIndex(tempFlashcardNum);
    }

    return (
        <>
            <Button variant="secondary" onClick={handleShow}>
                View Flashcards
            </Button>
                <Modal
                    show={show}
                    onHide={handleClose}
                    backdrop="static"
                    keyboard={false}
                >
                    <Modal.Body>
                        <Card>
                            <Card.Body>
                                <Card.Title>
                                    {/*{flashcard[index] && flashcard[index].title}*/}
                                    <h1>blah</h1>
                                </Card.Title>
                                <Card.Text>
                                    {/*{flashcard[index] && flashcard[index].description}*/}
                                    <h1>blahblah</h1>
                                </Card.Text>
                            </Card.Body>
                        </Card>
                        {/*<div className="buttons">*/}
                        {/*    <div className="previousCard">*/}
                        {/*        <div className="col text-left">*/}
                        {/*            <Button variant="primary"  onClick={() => previousFlashcard()}/>*/}
                        {/*        </div>*/}
                        {/*    </div>*/}
                        {/*    <div className="nextCard">*/}
                        {/*        <div className="col text-right">*/}
                        {/*            <Button variant="primary" onClick={() => nextFlashcard()}/>*/}
                        {/*        </div>*/}
                        {/*    </div>*/}
                        {/*</div>*/}
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>Close</Button>
                    </Modal.Footer>
            </Modal>
        </>
    )
}

export default Flashcards;