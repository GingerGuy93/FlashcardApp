import React, {useState, useEffect} from 'react';
import axios from 'axios';
import Table from "react-bootstrap/Table"
import Button from "react-bootstrap/Button"
import CreateCollection from "./createCollection";
import Flashcards from "./flashcards.jsx";
import CreateFlashcard from "./createFlashcard.jsx";

const Collection = (props) => {
    const [collections, setCollections] = useState(null);

    useEffect(()=> {
        getCollection()}, [])


    async function getCollection() {
        try {
        let response = await axios.get('http://127.0.0.1:8000/collection/')
            console.log(response.data)
            setCollections(response.data)
        } catch (err) {
         console.log("API Unsuccessful", err)
        }
    }

    return (
        <div className="collections">
            <th><h1>Flashcard Collections < CreateCollection />  </h1></th>
            <Table  className="table-bordered">
               <thead>
                <tr>
                </tr>
               </thead>
               <tbody>
                <ul>
                {collections && collections.map(collection => {
                    return <li><td>{collection.name}
                        <Flashcards collectionId={collection.id} />
                        <CreateFlashcard />  </td></li>
                })}
                </ul>
               </tbody>
           </Table>
        </div>
    );
}
export default Collection;
