import React, {useState, useEffect} from "react";
import axios from "axios";
import Card from "react-bootstrap/Card";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

const Flashcards = (props) => {
    const [flashcard, setFlashcard] = useState([]);
    const [index, setIndex] = useState(0);


    useEffect(() => {getFlashcards(props.collectionId)}, [])

    let getFlashcards = async (collectionId) => {
        let response = await axios.get(`http://127.0.0.1:8000/collection/cards/${collectionId}`);
        if (response.data){setFlashcard(response.data)}
        else{setFlashcard([])};
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

    let deleteFlashcard = async (collectionId, flashcardId) => {
        try {
            await axios.delete(`collection/cards/${collectionId}/${flashcardId}`);
            nextFlashcard();
            await getFlashcards(props.collectionId);
        }
        catch(err){
        }
    }

    return (
        <>
            <Card>
                <Card.Body>
                    <Card.Title>
                        {flashcard[index] && flashcard[index].title}
                    </Card.Title>
                    <Card.Text>
                        {flashcard[index] && flashcard[index].description}
                    </Card.Text>
                    <div className="delete">
                        <div className="col text-right">
                            <Button variant="danger" onClick={() => deleteFlashcard(props.collectionId, props.flashcardId)}>
                                Delete
                            </Button>
                        </div>
                    </div>
                </Card.Body>
            </Card>
            <div className="buttons">
                <div className="previousCard">
                    <div className="col text-left">
                        <Button variant="primary"  onClick={() => previousFlashcard()}>
                            Previous Card
                        </Button>
                    </div>
                </div>
                <div className="nextCard">
                    <div className="col text-right">
                        <Button variant="primary" onClick={() => nextFlashcard()}>
                            Next Card
                            </Button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Flashcards;