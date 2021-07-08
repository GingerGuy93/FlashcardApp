import React, {useState, useEffect} from 'react';
import axios from 'axios';
import Table from "react-bootstrap/Table"
import Button from "react-bootstrap/Button"
import CreateCollection from "./createCollection";
import Flashcards from "./flashcards";
import CreateFlashcard from "./createFlashcard";

const Collection = (props) => {
    const [collections, setCollections] = useState(null);

    useEffect(() => {
        axios.get('http://127.0.0.1:8000/collection/').then(response => setCollections(response.data)
        )}, []);

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
